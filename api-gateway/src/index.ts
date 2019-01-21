import * as fastify from 'fastify'
import * as fp from 'fastify-plugin'
import * as fs from 'fs'

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
   
    {
      prefix: '/api',
      prefixRewrite: '',
      target: 'http://localhost:8081',
      middlewares: [                  
      ],
      hooks: {      
        // TODO user authentication jwt
        async onRequest (request:any, reply:any) {
          // your validation logic
          // get user by token IF NOT sent error; IF USER -> pass user in http header
          console.log('AUTH: ' + reply.context.config.auth)
          reply.context.config.auth // auth config          
        }
      }
    },
  
    // USER API for admin only - basic-auth-connect authentication
    {
      prefix: '/users',
      prefixRewrite: '',
      target: 'http://localhost:8082',
      middlewares: [
        // require('basic-auth-connect')('admin', 'most-save-pass')
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