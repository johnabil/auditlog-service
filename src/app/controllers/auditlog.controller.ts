import {AuditLogRepository} from "../repositories/auditlog.repo";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export class AuditlogController {
    private readonly auditLogRepo;

    constructor(fastify: FastifyInstance) {
        this.auditLogRepo = new AuditLogRepository(fastify.sequelize);
    }

    async list(Request: FastifyRequest, Response: FastifyReply) {
        const {page = 1, limit = 10, user_id, transaction_id} = Request.query as {
            page?: number;
            limit?: number;
            user_id?: number;
            transaction_id?: string;
        };
        let totalPages = 0;
        try {
            const offset = (page - 1) * limit;

            const {rows: logs, count: total} = await this.auditLogRepo.list({
                user_id: user_id,
                transaction_id: transaction_id,
            }, offset, limit);

            totalPages = Math.ceil(total / limit);

            return Response.send({
                data: logs,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages,
                },
            });
        } catch (error: any) {
            console.log(error);
            return Response.send({
                data: [],
                meta: {
                    total: 0,
                    page,
                    limit,
                    totalPages,
                },
            });
        }
    };
}
