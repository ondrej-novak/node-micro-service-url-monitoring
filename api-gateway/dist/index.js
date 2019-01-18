"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toArray = require('stream-to-array');
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
            target: 'http://localhost:3001',
            middlewares: [],
            hooks: {
                async onRequest(request, reply) {
                    //get user
                    console.log('AUTH: ' + reply.context.config.auth);
                    reply.context.config.auth;
                }
            }
        },
        {
            prefix: '/users',
            prefixRewrite: '',
            target: 'http://localhost:3002',
            middlewares: [
                require('basic-auth-connect')('admin', 's3cr3t-pass')
            ],
            hooks: {}
        }
    ]
});
gateway.listen(8080).then(function (address) {
    console.log(`API Gateway listening on ${address}`);
});
//# sourceMappingURL=index.js.map