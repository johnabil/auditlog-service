import {AuditLogRepository} from "../repositories/auditlog.repo";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export class AuditlogController {
    private readonly auditLogRepo;

    constructor(fastify: FastifyInstance) {
        this.auditLogRepo = new AuditLogRepository(fastify.sequelize);
    }

    async list(Request: FastifyRequest, Response: FastifyReply) {
        return await this.auditLogRepo.list();
    };
}
