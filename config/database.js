const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistema_tarefas', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
