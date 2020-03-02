'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  {
    return queryInterface.createTable('Account', 
    {
        id: 
        {
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        balance: 
        {
            allowNull: false,
            type: Sequelize.DECIMAL
        },        
        number: 
        {
            allowNull: false,
            type: Sequelize.INTEGER
        },        
        owner: 
        {
            allowNull: false,
            type: Sequelize.INTEGER
        },                        
    })
  },

  down: (queryInterface, Sequelize) => 
  {
    return queryInterface.dropTable('Account');
  }
};
