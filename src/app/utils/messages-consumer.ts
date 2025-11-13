import {FastifyInstance} from "fastify";
import {FastifyRedis} from "@fastify/redis";
import {AuditLogRepository} from "../repositories/auditlog.repo";

export const messagesConsumer = async (fastify: FastifyInstance) => {
    const redisClient: FastifyRedis = fastify.redis;
    const stream = 'transactions_stream';
    const group = 'transactions_group';
    const consumer = 'transactions_consumer';
    const auditLogRepo = new AuditLogRepository(fastify.sequelize);

    try {
        await redisClient.xgroup('CREATE', stream, group, '$', 'MKSTREAM');
    } catch (error: any) {
        if (!error.message.includes('BUSYGROUP'))
            fastify.log.error(error);
    }

    //consuming messages
    while (true) {
        try {
            const res: Array<any> = await redisClient.xreadgroup('GROUP', group, consumer,
                'COUNT', 10, 'BLOCK', 5000, 'STREAMS', stream, '>');

            if (!res) continue;

            for (const [, messages] of res) {
                for (const message of messages) {
                    const messageId = message[0];
                    const [, payload] = message[1];
                    const data = JSON.parse(payload);

                    switch (data.event) {
                        case 'TransactionCreated':
                            await auditLogRepo.create({
                                user_id: data.user_id,
                                transaction_id: data.transaction_id,
                                action: data.event,
                                before: data.before,
                                after: data.after
                            });
                            break;
                        case 'TransactionDeleted':
                            await auditLogRepo.destroy(data.transaction_id);
                            break;
                    }

                    await redisClient.xack('transactions_stream', group, messageId);
                }
            }
        } catch (error) {
            fastify.log.error(error);
        }
    }
};
