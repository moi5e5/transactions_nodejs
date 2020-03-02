import { stringify } from "querystring";

export function AccountsSchema(fastify) {
    return {
        schema: {
            summary: 'Get all accounts',
            tags: ['accounts'],
            response: 
            {
                200: 
                {
                    type: 'object',
                    properties: 
                    {
                        accounts: 
                        {
                            type: 'array',
                            items: 
                            {
                                type: 'object',
                                properties: 
                                {
                                    id: 
                                    {
                                        type: 'string',
                                        example: 'ef82897c-5838-442f-81c0-9cb5401cabbf'
                                    },
                                    number: 
                                    {
                                        type: 'number',
                                        example: '123456789'
                                    },
                                    balance: 
                                    {
                                        type: 'string',
                                        example: '10000.10'
                                    },
                                    owner: 
                                    {
                                        type: 'number',
                                        example: '123456789'
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