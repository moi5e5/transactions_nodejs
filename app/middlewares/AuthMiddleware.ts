const fp     = require('fastify-plugin');
const jwt    = require('jsonwebtoken');
const moment = require('moment');

function AuthMiddleware(fastify, opts, next) 
{
    fastify.decorateRequest('currentUser', false);
    fastify.decorateRequest('currentAdmin', false);
    fastify.addHook('preHandler', authorize);

    function authorize (req, reply, next) 
    {
        if(req.raw.url == '/auth/token'     ||
           req.raw.url.match(/api/) != null ||
           req.headers["access-control-request-headers"] != null)
        {
           return next(); 
        }
           
        let authorization = req.headers['authorization'];
   
        if(!authorization) 
        {
            reply.unauthorized('Credentials not provided');
        }
        else 
        {
            let match = req.headers['authorization'].match(/Bearer (.*)/);
            if(match.length > 1) 
            {
                let hash = match[1];
                fastify.models.Token.findOne({where: {hash: hash}}).then(token => 
                {
                    if(token !== null) 
                    {
                       next();

                    }
                    else {
                        reply.unauthorized('Credentials are invalid.');
                    }
                });
            }
            else {
                reply.unauthorized('Credentials not provided.');
            }
        }
    }
    next();
}

module.exports = fp(AuthMiddleware, {
    fastify: '>=1.13.4',
    name: 'auth-middleware'
})