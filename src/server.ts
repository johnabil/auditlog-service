import Fastify from "fastify";


const fastify = Fastify({
    logger: true,
});

fastify.listen({port: Number(process.env.PORT)}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
