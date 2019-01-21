# Node, microservice endpoint monitoring

API service, that creates monitoring reports from endpoint monitoring payload. Coded in **Node.js**, using microservices. For building API REST use **restify** framevork and **TypeScript**.  Used database **MySQL** implemented by **typeorm**.

## Todo

- Implement Authentication
- Implement Authorization
- Write Mocha or Jest tests
- Create Docker configuration


## Installation and run

Install for each services node_modules:

```
npm install
```

Build Typescript each service

```
npm run build
```

Start API Gateway and Endpoint Service. In each file run:
```
npm start
```

# Usage

## API Gateway
See https://www.npmjs.com/package/k-fastify-gateway. API Gataway will run in http://localhost:8080/ and routes everything from **/api** target to service listening on http://localhost:8080
```javascript
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
      target: 'http://localhost:8080',
      middlewares: [
          // require('basic-auth-connect')('admin', 'most-save-pass')
      ],
      hooks: {
        // TODO user authentication jwt
        async onRequest (request:any, reply:any) {
          // your validation logic
          // ...
          console.log('AUTH: ' + reply.context.config.auth)
      }
    },
  ]
}

gateway.listen (8080).then(function(address:string){
  console.log(`API Gateway listening on ${address}`)
});
```

## Endpoint Service

