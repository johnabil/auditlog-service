import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

const schema = {
    type: 'object',
    required: ['APP_NAME', 'DB_URL'],
    properties: {
        PORT: {type: 'number', default: 3000},
        APP_NAME: {type: 'string'},
        DB_URL: {type: 'string'},
    },
};

const options = {
    confKey: 'config',
    schema: schema,
    dotenv: true,
    data: process.env,
}

export default fp(async (fastify, opts) => {
    await fastify.register(fastifyEnv, options)
})
