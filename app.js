const express = require('express');
const bodyParser = require('body-parser');
const tarefasRoutes = require('./routes/tarefas');
const sequelize = require('./config/database'); // Configuração do banco

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/tarefas', tarefasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    sequelize.sync(); // Sincroniza o modelo com o banco de dados
});
