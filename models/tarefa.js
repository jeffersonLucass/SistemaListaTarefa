const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configure o Sequelize

class Tarefa extends Model {}

Tarefa.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    custo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    data_limite: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ordem_apresentacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Tarefa',
});

module.exports = Tarefa;
