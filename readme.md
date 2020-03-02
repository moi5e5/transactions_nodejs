# Transactions
Digital Hub - Backend
Assignment - CP

## Installation
> made with love & NodeJS, Sequelize, Fastify

- First, install all dependencies:

```bash
npm install
```

- Create the database "assignment_nodejs" (postgres) in your localhost (or your database server)
- Create the user "assignment_nodejs" (postgres) in your localhost (or your database server)

- Change database settings in db/config-sample.json

- Run the nodejs development server

```bash
npm start
```

- Open your browser in localhost:8080/

## Usage

- Please visit the swagger docs: http://localhost:8080/api

### add transaction
POST /transactions/

### get all transactions by account
GET /transactions/{account_number}

### get all sent transactions by account
GET /transactions/{account_number}/?sent

### get all received transactions by account
GET /transactions/{account_number}/?received

### get account balance
GET /balance/{account_number}/

## License
[MIT](https://choosealicense.com/licenses/mit/)