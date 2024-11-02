const express = require('express');
const Tarefa = require('../models/tarefa');
const router = express.Router();

// Listar todas as tarefas
router.get('/', async (req, res) => {
    const tarefas = await Tarefa.findAll({ order: ['ordem_apresentacao'] });
    res.json(tarefas);
});

// Adicionar nova tarefa
router.post('/', async (req, res) => {
    const { nome, custo, data_limite } = req.body;
    const ordem_apresentacao = await Tarefa.count() + 1; // Próximo número
    try {
        const novaTarefa = await Tarefa.create({ nome, custo, data_limite, ordem_apresentacao });
        
        // Redirecionar para a lista de tarefas
        res.redirect('/'); // Ajuste para o caminho correto se necessário
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Editar tarefa
router.put('/:id', async (req, res) => {
    const { nome, custo, data_limite } = req.body;
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
        tarefa.nome = nome;
        tarefa.custo = custo;
        tarefa.data_limite = data_limite;
        await tarefa.save();
        res.json(tarefa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir tarefa
router.delete('/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
        await tarefa.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
