module.exports = (sequelize, DataTypes) => 
{
    const Model = sequelize.define('Account', 
    {
        id: 
        {
            defaultValue : DataTypes.UUIDV1,
            primaryKey	 : true,
            type 		 : DataTypes.UUID,
        },
        balance: 
        {
            type: DataTypes.DECIMAL(20, 2)   
        },
        number: 
        {
            type: DataTypes.INTEGER,
            unique: true
        },
        owner: 
        {
            type: DataTypes.INTEGER
        },
    }, 
    {
        freezeTableName: true,
        timestamps: false        
    });

    return Model;
};