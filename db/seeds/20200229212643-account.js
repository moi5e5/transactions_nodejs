'use strict';
const crypto = require("crypto");
module.exports = 
{
  up: (queryInterface, Sequelize) => 
  {
      let data = [];
      for (var _i = 0; _i < 10; _i++) 
      {
        let uid = crypto.randomBytes(16).toString("hex");
        data.push(
        {
            id       : uid,
            number   : Math.floor(Math.random() * 10000) + 500,
            owner    : Math.floor(Math.random() * 10000) + 500,
            balance  : Math.floor(Math.random() * 200000) + 1,
        });
      }      

      console.log(data)

      return queryInterface.bulkInsert('Account', data);
  },

  down: (queryInterface, Sequelize) => 
  {
  }
};
