CREATE DATABASE sistema_tarefas;


create table Tarefas(
	 id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    custo DECIMAL(10, 2) NOT NULL,
    data_limite DATE NOT NULL,
    ordem_apresentacao INT NOT NULL UNIQUE
);

ALTER TABLE Tarefas
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

select * from Tarefas;


