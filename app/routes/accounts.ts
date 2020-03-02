import { AccountsSchema } from '../schemas/accounts/AccountSchema';
import { AccountController } from '../controllers/AccountController';

module.exports = function accounts(fastify, opts, next) 
{
    fastify.get('/accounts', AccountsSchema(fastify), AccountController.index(fastify));
    fastify.get('/balance/:number', AccountsSchema(fastify), AccountController.index(fastify));
    next();
};