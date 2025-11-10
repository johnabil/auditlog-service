import Fastify from "fastify";


const fastify = Fastify({
    logger: true,
});

fastify.listen({port: Number(process.env.PORT || 3000)}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
