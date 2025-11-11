import fp from 'fastify-plugin';
import {Sequelize} from 'sequelize';
import {loadModels} from "../app/utils/models.loader";

export default fp(async (fastify, opts) => {
    const options = {
        dialect: 'postgres',
    };
    const sequelize = new Sequelize(<string>process.env.DB_URL, <object>options);

    try {
        await sequelize.authenticate();
    } catch (e) {
        fastify.log.error(e);
    }

    await loadModels(sequelize);

    fastify.decorate('sequelize', sequelize);
    fastify.addHook('onClose', async (fastify) => {
        await sequelize.close()
    })
});

declare module 'fastify' {
    interface FastifyInstance {
        sequelize: Sequelize;
    }
}
