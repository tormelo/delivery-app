module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(10,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
  };

  return Sale;
};