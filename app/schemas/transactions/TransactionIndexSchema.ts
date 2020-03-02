export function TransactionIndexSchema(fastify) 
{
    return {
        schema: 
        {
            security: [],
            tags: ['transaction'],
            summary: 'index transaction',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        transactions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'string',
                                        example: 'b8652336-5d68-11e9-8647-d663bd873d93',
                                    },
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
				                    },   
                                    createdAt: {
                                        type: 'string',
                                        example: '2019-04-15T04:12:17.848Z'
                                    },
                                    updatedAt: {
                                        type: 'string',
                                        example: '2019-04-15T04:12:17.848Z'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}