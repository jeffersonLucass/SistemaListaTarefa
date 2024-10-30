async function carregarTarefas() {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    const tbody = document.querySelector('#tarefas-table tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior

    tarefas.forEach(tarefa => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${tarefa.nome}</td>
            <td style="background-color: ${tarefa.custo >= 1000 ? 'yellow' : 'white'};">${tarefa.custo.toFixed(2)}</td>
            <td>${new Date(tarefa.data_limite).toLocaleDateString()}</td>
            <td>
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function incluirTarefa() {
    const nome = prompt('Nome da Tarefa:');
    const custo = parseFloat(prompt('Custo (R$):'));
    const data_limite = prompt('Data Limite (YYYY-MM-DD):');

    await fetch('/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, custo, data_limite }),
    });

    carregarTarefas();
}

async function excluirTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        await fetch(`/tarefas/${id}`, {
            method: 'DELETE',
        });
        carregarTarefas();
    }
}

async function editarTarefa(id) {
    const tarefa = await fetch(`/tarefas/${id}`);
    const data = await tarefa.json();

    const novoNome = prompt('Novo Nome da Tarefa:', data.nome);
    const novoCusto = parseFloat(prompt('Novo Custo (R$):', data.custo));
    const novaDataLimite = prompt('Nova Data Limite (YYYY-MM-DD):', data.data_limite);

    await fetch(`/tarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: novoNome, custo: novoCusto, data_limite: novaDataLimite }),
    });

    carregarTarefas();
}

document.getElementById('incluir-tarefa').addEventListener('click', incluirTarefa);

// Carrega as tarefas ao iniciar a página
carregarTarefas();
