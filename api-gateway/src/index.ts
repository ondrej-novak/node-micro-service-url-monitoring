const toArray = require('stream-to-array')

import * as fastify from 'fastify'
import * as fp from 'fastify-plugin'

const gateway = fastify({})

// plugin for HTTP requests proxy
gateway.register(require('fastify-reply-from'))

// gateway plugin
gateway.register(require('k-fastify-gateway'), {

  middlewares: [
    require('cors')(),
    require('helmet')()
  ],

  routes: [
    // cokoliv za api je verejne, ale authorization & validation for user (remove user from services)
    // user se dotahne podle token IF NOT sent error; IF USER -> pass user in http header
    {
      prefix: '/api',
      prefixRewrite: '',
      target: 'http://localhost:3001',
      middlewares: [                  
      ],
      hooks: {      
        async onRequest (request:any, reply:any) {
          // your validation logic
          console.log('AUTH: ' + reply.context.config.auth)
          reply.context.config.auth // auth config          
        }
      }
    },
  
    // USER API for admin only - basic-auth-connect authentication
    {
      prefix: '/users',
      prefixRewrite: '',
      target: 'http://localhost:3002',
      middlewares: [
        require('basic-auth-connect')('admin', 's3cr3t-pass')
      ],
      hooks: {
      }
    }
  ]
})

// start the gateway HTTP server
gateway.listen (8080).then(function(address:string){
  console.log(`API Gateway listening on ${address}`)
});