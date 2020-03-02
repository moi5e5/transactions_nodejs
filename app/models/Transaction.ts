module.exports = (sequelize, DataTypes) => 
{
    const Model = sequelize.define('Transaction', 
    {
        id: 
        {
            defaultValue : DataTypes.UUIDV1,
            primaryKey	 : true,
            type 		 : DataTypes.UUID,
        },
        fromaccountId: 
        {
            type: DataTypes.UUID
        },        
        toaccountId: 
        {
            type: DataTypes.UUID
        },  
        ammount: 
        {
            type: DataTypes.DECIMAL(20, 2) 
        },  
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }        
    },
    {
        freezeTableName: true,
    });

    Model.associate = (models: any) => {
        Model.belongsTo(models.Account, { as: 'fromaccount' });
        Model.belongsTo(models.Account, { as: 'toaccount' })
    };


    return Model;
};