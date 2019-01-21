"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const gateway = fastify({});
gateway.register(require('fastify-reply-from'));
gateway.register(require('k-fastify-gateway'), {
    middlewares: [
        require('cors')(),
        require('helmet')()
    ],
    routes: [
        {
            prefix: '/api',
            prefixRewrite: '',
            target: 'http://localhost:8081',
            middlewares: [],
            hooks: {
                async onRequest(request, reply) {
                    console.log('AUTH: ' + reply.context.config.auth);
                    reply.context.config.auth;
                }
            }
        },
        {
            prefix: '/users',
            prefixRewrite: '',
            target: 'http://localhost:8082',
            middlewares: [],
            hooks: {}
        }
    ]
});
gateway.listen(8080).then(function (address) {
    console.log(`API Gateway listening on ${address}`);
});
//# sourceMappingURL=index.js.map