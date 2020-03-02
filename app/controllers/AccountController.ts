import { AccountsSchema } from "../schemas/accounts/AccountSchema";
import { now } from "moment";

export class AccountController 
{
    static index : Function = (fastify) => 
    {
        return (req, reply) => 
        {
            let number = req.params.number;
            var query : any = 
            {
                where: {},
                include: [{ all: true }],
                order: [
                    ['id', 'DESC']
                ]
            }; 

            if(number)
            {
                query = 
                {
                    where: { number : number },
                    include: [{ all: true }],
                    order: [
                        ['id', 'DESC']
                    ]
                };                 
            }

            fastify.models.Account.findAll(query).then(accounts => 
            {
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(
                    { 
                    	accounts: accounts 
             		})
            });
        };
    }
}
