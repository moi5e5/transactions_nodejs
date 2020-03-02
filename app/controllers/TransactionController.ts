import { now }                     from "moment";
import { sequelize }               from 'sequelize';
import { TransactionCreateSchema } from "../schemas/transactions/TransactionCreateSchema";

export class TransactionController 
{
    static index : Function = (fastify) =>
    {
        return (req, reply) => 
        {
            let number = req.params.number;
            let mode   = req.params.mode;

            if(!number)
            {
                reply.code(400)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ message: 'Bad request. Number param is required.' });                
                return false;                                        
            }

            fastify.models.Account.findOne({where: {number : number}}).then(account=>
            {
                if(!account)
                {
                    reply.code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ message: 'The account does not exists.' });                
                    return false;                        
                }

                if(!mode)
                {
                    fastify.models.Transaction.findAll({where: { $or: [{ fromaccountId : account.id }, { toaccountId : account.id }] }}).then(transactions=>
                    {
                        var data  = req.body;  
                        reply
                        .code(201)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ transactions: transactions });                                         
                    });    

                    return;                
                }

                if(mode == 'sent')
                {
                    fastify.models.Transaction.findAll({ where: { fromaccountId: account.id } }).then(transactions=>
                    {
                        var data  = req.body;  
                        reply
                        .code(201)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ transactions: transactions });                                         
                    }); 

                    return;                   
                }          

                if(mode == 'received')
                {
                    fastify.models.Transaction.findAll({ where: { toaccountId: account.id } }).then(transactions=>
                    {
                        var data  = req.body;  
                        reply
                        .code(201)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ transactions: transactions });                                         
                    }); 

                    return;                   
                }   

                reply.code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ message: 'Bad request. The parameter mode is required (sent/received).' });                
                return false;     
            });
        };        
    }

    static create : Function = (fastify) => 
    {

        var from  = undefined;
        var to    = undefined;

        return (req, reply) => 
        {
            var data  = req.body;

            fastify.models.Account.findOne({where: {number: data.fromaccount}}).then(fromaccount => 
            {
                if(fromaccount) 
                {
                    from = fromaccount;
                    fastify.models.Account.findOne({where: {number: data.toaccount}}).then(toaccount => 
                    {
                        if(toaccount) 
                        {
                            to = toaccount;
                            let future_balance = from.balance - data.ammount
                            if(future_balance <= -500)
                            {
                                reply.code(404)
                                .header('Content-Type', 'application/json; charset=utf-8')
                                .send({ message: 'The account balance would be reached minimum allowed.' });                
                                return false;                
                            }

                            let data_transaction = 
                            {
                                fromaccountId : from.id,
                                toaccountId   : to.id,
                                ammount       : data.ammount
                            }

                            fastify.models.Transaction.create(data_transaction).then(transaction => 
                            {
                                if(transaction) 
                                {

                                    from.balance = from.balance - data.ammount;
                                    to.balance   = to.balance   + data.ammount;

                                    try 
                                    {                                

                                        from.save()
                                        to.save()

                                        reply
                                            .code(201)
                                            .header('Content-Type', 'application/json; charset=utf-8')
                                            .send({ transaction: transaction });                                         

                                    } catch (err) 
                                    {
                                        reply.internalServerError();
                                    }                                    
                                   
                                } else 
                                {
                                    reply.internalServerError();
                                }
                            });                            
                        }else
                        {
                            reply.code(404)
                            .header('Content-Type', 'application/json; charset=utf-8')
                            .send({ message: 'The account does not exists.' });                
                            return false;                            
                        }
                    });                         
                }else
                {
                    reply.code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ message: 'The account does not exists.' });                
                    return false;                    
                }
            });            
        };
    }
}
