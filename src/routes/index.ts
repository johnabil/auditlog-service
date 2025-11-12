import {FastifyInstance} from 'fastify'
import {AuditlogController} from "../app/controllers/auditlog.controller";

const routes = async function (fastify: FastifyInstance) {
    const AuditLogController = new AuditlogController(fastify);

    fastify.get("/", async () => {
        return {
            'message': "Health check."
        }
    });

    fastify.get("/auditlogs", AuditLogController.list.bind(AuditLogController));
}

export default routes
