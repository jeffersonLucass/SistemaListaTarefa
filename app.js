const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Adicionei para facilitar a renderização de arquivos HTML
const tarefasRoutes = require('./routes/tarefas');
const sequelize = require('./config/database'); // Configuração do banco

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Renderiza o arquivo index.html da pasta public
});

// Rotas de tarefas
app.use('/tarefas', tarefasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    sequelize.sync(); // Sincroniza o modelo com o banco de dados
});
