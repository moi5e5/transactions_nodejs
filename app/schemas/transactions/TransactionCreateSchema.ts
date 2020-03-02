export function TransactionCreateSchema(fastify) 
{
    return {
        schema: 
        {
            security: [],
            tags: ['transaction'],
            summary: 'Create new transaction',
            body: 
            {
                type: 'object',
                properties: 
                {
                    fromaccount: 
                    {
                        type: 'string'
                    },
                    toaccount: 
                    {
                        type: 'string'
                    },
                    ammount: 
                    {
                        type: 'number'
                    }                    
                },
                required: ['fromaccount', 'toaccount', 'ammount']
            },
            response: 
            {
                200: 
                {
                    type: 'object',
                    properties: 
                    {
                        success: 
                        {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    };
}