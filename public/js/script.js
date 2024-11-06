async function carregarTarefas() {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    const tbody = document.querySelector('#tabela-tarefas tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior
    tarefas.forEach(tarefa => {
        const custoFormatado = isNaN(tarefa.custo) ? 0 : parseFloat(tarefa.custo).toFixed(2); // Garantir que 'custo' é um número
        const tr = document.createElement('tr');

        // Muda a cor da linha inteira se o custo for igual ou superior a 1000
        if (parseFloat(tarefa.custo) >= 1000) {
            tr.style.backgroundColor = 'yellow';
        }

        tr.innerHTML = `
            <td>${tarefa.nome}</td>
            <td>${custoFormatado}</td>
            <td>${new Date(tarefa.data_limite).toLocaleDateString()}</td>
            <td>
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
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

// Carrega as tarefas ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas(); 
});
