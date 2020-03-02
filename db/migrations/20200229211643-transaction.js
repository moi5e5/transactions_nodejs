'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  {
    return queryInterface.createTable('Transaction', 
    {
        id: 
        {
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        fromaccountId: {
            allowNull: false,
            type: Sequelize.UUID
        },
        toaccountId: {
            allowNull: false,
            type: Sequelize.UUID
        },
        ammount: 
        {
            allowNull: false,
            type: Sequelize.DECIMAL
        },   
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }                                     
    });
  },

  down: (queryInterface, Sequelize) => 
  {
    return queryInterface.dropTable('Transaction');
  }
};
