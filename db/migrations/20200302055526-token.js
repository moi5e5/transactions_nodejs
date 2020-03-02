'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  {
    return queryInterface.createTable('Token', 
    {
        id: 
        {
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        hash: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        expiredAt: {
            allowNull: false,
            type: Sequelize.DATE
        }                                     
    });
  },

  down: (queryInterface, Sequelize) => 
  {
    return queryInterface.dropTable('Token');
  }
};
