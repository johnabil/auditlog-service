import fp from 'fastify-plugin';
import {fastifyRedis} from "@fastify/redis";
import {messagesConsumer} from "../app/utils/messages-consumer";

export default fp(async (fastify, opts) => {
    fastify.register(fastifyRedis, {
        url: process.env.REDIS_URL
    });

    fastify.addHook('onReady', async () => {
        messagesConsumer(fastify).catch(fastify.log.error);
    });

    fastify.addHook('onClose', async () => {
        fastify.redis.disconnect();
    });
});
