import fp from 'fastify-plugin';
import {fastifyRedis} from "@fastify/redis";

export default fp(async (fastify, opts) => {
    fastify.register(fastifyRedis, {
        url: process.env.REDIS_URL
    });

    fastify.get('/streams', async (request, reply) => {
        // todo: implement streams to fetch audit logs events
    });
});
