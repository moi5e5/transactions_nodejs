'use strict';
const crypto = require("crypto");
module.exports = 
{
  up: (queryInterface, Sequelize) => 
  {
      let uid = crypto.randomBytes(16).toString("hex"); 
      let data = [
      {
        id        : uid,
        hash      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc0OTc0MTUsImRhdGEiOnsiaWQiOiI3ZjQzOTAwZi04ZGQzLTRlMDQtYTEzNi1mNWUyNzkxMmMxMWIiLCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1Njg5MjYxNX0.mfiVFYWThY1BEvwyTWVf-S2TxkNnRSJ8hXE2AC_ecL0',
        expiredAt : '2021/01/01'
      }];
  
      console.log(data)
      return queryInterface.bulkInsert('Token', data);
  },

  down: (queryInterface, Sequelize) => 
  {

  }
};
