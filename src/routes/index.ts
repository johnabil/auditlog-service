import {FastifyInstance} from 'fastify'
import {AuditLogController} from "../app/controllers/auditlog.controller";

const routes = async function (fastify: FastifyInstance) {
    const logsController = new AuditLogController(fastify);

    fastify.get("/", async () => {
        return {
            'message': "Health check."
        }
    });

    fastify.get("/logs", logsController.list.bind(logsController));
}

export default routes
