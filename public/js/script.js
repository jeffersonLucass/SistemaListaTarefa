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
    try {
        const nome = prompt('Nome da Tarefa:');
        if (!nome) throw new Error('Nome da tarefa não pode ser vazio.');

        const custo = parseFloat(prompt('Custo (R$):'));
        if (isNaN(custo)) throw new Error('Custo deve ser um número válido.');

        const data_limite = prompt('Data Limite (YYYY-MM-DD):');
        if (!data_limite || isNaN(Date.parse(data_limite))) throw new Error('Data limite inválida.');

        const response = await fetch('/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, custo, data_limite }),
        });

        if (!response.ok) throw new Error('Erro ao incluir a tarefa.');

        carregarTarefas();
    } catch (error) {
        console.error('Erro ao incluir tarefa:', error);
        alert(`Erro: ${error.message}`);
    }
}

async function excluirTarefa(id) {
    try {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            const response = await fetch(`/tarefas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao excluir a tarefa.');

            carregarTarefas();
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        alert('Não foi possível excluir a tarefa. Tente novamente.');
    }
}

async function editarTarefa(id) {
    try {
        const response = await fetch(`/tarefas/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar detalhes da tarefa.');

        const data = await response.json();

        const novoNome = prompt('Novo Nome da Tarefa:', data.nome);
        if (!novoNome) throw new Error('Nome da tarefa não pode ser vazio.');

        const novoCusto = parseFloat(prompt('Novo Custo (R$):', data.custo));
        if (isNaN(novoCusto)) throw new Error('Custo deve ser um número válido.');

        const novaDataLimite = prompt('Nova Data Limite (YYYY-MM-DD):', data.data_limite);
        if (!novaDataLimite || isNaN(Date.parse(novaDataLimite))) throw new Error('Data limite inválida.');

        const updateResponse = await fetch(`/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: novoNome, custo: novoCusto, data_limite: novaDataLimite }),
        });

        if (!updateResponse.ok) throw new Error('Erro ao atualizar a tarefa.');

        carregarTarefas();
    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        alert(`Erro: ${error.message}`);
    }
}

// Adiciona o evento de clique para o botão de incluir tarefa
document.getElementById('incluir-tarefa').addEventListener('click', incluirTarefa);

// Carrega as tarefas ao iniciar a página

document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas(); 
});



document.getElementById('incluir-tarefa').addEventListener('click', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    await incluirTarefa(); // Chama a função para incluir a tarefa
    carregarTarefas(); // Atualiza a lista de tarefas
});