const toArray = require('stream-to-array')
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
    // cokoliv za api je verejne, ale authorization & validation for user (remove user from services)
    // user se dotahne podle token IF NOT sent error; IF USER -> pass user in http header
    {
      prefix: '/api',
      prefixRewrite: '',
      target: 'http://localhost:3001',
      middlewares: [                  
      ],
      hooks: {      
        // TODO user authentication jwt
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
        // require('basic-auth-connect')('admin', 's3cr3t-pass')
      ],
      hooks: {
      }
    }
  ]
})


// This is where lazyloading magic for nodejs happens
// fs.readdirSync(__dirname + '/user-service/dist').forEach(function (plugin) {

//   plugin = plugin.replace('.js', '');

//   // __defineGetter__ is a getter method which will be called if particluar
//   // property (or submodule in our case) will be requested
//   exports.__defineGetter__(plugin, function () {
//     return require('./submodules/' + plugin);
//   });

// });

// start the gateway HTTP server
gateway.listen (8080).then(function(address:string){
  console.log(`API Gateway listening on ${address}`)
});