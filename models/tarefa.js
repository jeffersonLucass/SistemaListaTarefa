const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configure o Sequelize

class Tarefa extends Model {}

Tarefa.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, // Validação para não aceitar valores vazios
        }
    },
    custo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true, // Validação para aceitar apenas números decimais
            min: 0,          // Validação para garantir valor positivo
        }
    },
    data_limite: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,    // Validação para garantir que seja uma data válida
        }
    },
    ordem_apresentacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            isInt: true,     // Validação para garantir que seja um número inteiro
            min: 1           // Definir um valor mínimo para a ordem (opcional)
        }
    },
}, {
    sequelize,
    modelName: 'Tarefa',
});

module.exports = Tarefa;
