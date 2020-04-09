import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      owner: "Eric"
    });

    const repository = response.data;

    console.log(repository.title);

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`, (request, response) => {
    });
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(`${repository.id}`)}>Remover</button></li>)}
      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
