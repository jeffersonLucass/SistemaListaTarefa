document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-tarefa').addEventListener('submit', incluirTarefa);
});

async function incluirTarefa(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const data_limite = document.getElementById('data_limite').value;

    await fetch('/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, custo, data_limite }),
    });

    // Aqui você pode redirecionar ou atualizar a lista de tarefas
    window.location.href = 'index.html'; // Redireciona para a página principal após incluir
}
