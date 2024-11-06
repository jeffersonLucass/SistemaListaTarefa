document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-tarefa').addEventListener('submit', incluirTarefa);
});

async function incluirTarefa(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const data_limite = document.getElementById('data_limite').value;
    console.log({ nome, custo, data_limite });
    try {
        const response = await fetch('/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, custo, data_limite }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Tenta obter detalhes do erro
            console.error('Erro ao incluir tarefa:', errorData);
            throw new Error(errorData.error || 'Erro ao incluir a tarefa.');
        }

        // Redireciona para a página principal após incluir a tarefa
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao incluir tarefa:', error);
        alert(`Erro: ${error.message}`);
    }
}
