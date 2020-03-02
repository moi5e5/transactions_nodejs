module.exports = (sequelize, DataTypes) => 
{
    const Model = sequelize.define('Token', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        hash: DataTypes.TEXT,
        expiredAt: DataTypes.DATE
    },
    {
        freezeTableName: true,
        timestamps: false      
    });


    return Model;
};