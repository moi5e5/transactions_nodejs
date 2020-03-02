import { TransactionCreateSchema } from '../schemas/transactions/TransactionCreateSchema';
import { TransactionIndexSchema } from '../schemas/transactions/TransactionIndexSchema';
import { TransactionController }   from '../controllers/TransactionController';

module.exports = function transactions(fastify, opts, next) 
{
    fastify.post('/transactions', TransactionCreateSchema(fastify), TransactionController.create(fastify));
    fastify.get('/transactions/:number/:mode', TransactionIndexSchema(fastify), TransactionController.index(fastify));
    next();
};