import {FastifyInstance} from 'fastify'

const routes = async function (fastify: FastifyInstance) {
    fastify.get("/", async () => {
        return {
            'message': "Health check."
        }
    });
}

export default routes
