import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import api from "./services/api";

import Repositorie from "./components/Repositorie";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [techs, setTechs] = useState([]);

  async function handleAddRepository(e) {
    try {
      e.preventDefault();

      const response = await api.post("repositories", {
        title,
        url,
        techs: techs,
      });

      setRepositories([...repositories, response.data]);

      setTitle("");
      setUrl("");
      setTechs("");
    } catch (error) {
      toast.error(`Error, ${error}`);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const index = repositories.findIndex((r) => r.id === id);

      repositories.splice(index, 1);

      setRepositories([...repositories]);

      toast.success("Success");
    } catch (error) {
      toast.error(`Error, ${error}`);
    }
  }

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get("/repositories");

        setRepositories(response.data);
      } catch (error) {
        toast.error("Error, something was wrong with your request ");
      }
    }

    loadRepositories();
  }, []);

  function handleTechs(value) {
    const techs = value.split(",");

    setTechs(techs);
  }

  return (
    <div className="container">
      <button onClick={handleAddRepository}>Adicionar</button>
      <div>
        <form onSubmit={(e) => handleAddRepository(e)}>
          <div className="item">
            <label>Title </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Ex..: Desafio 03"
            />
          </div>

          <div className="item">
            <label>Url </label>
            <input
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              placeholder="Ex..: https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs"
            />
          </div>

          <div className="item">
            <label>Techs </label>
            <input
              type="text"
              onChange={(e) => handleTechs(e.target.value)}
              value={techs}
              placeholder="Ex..: Node.js, ReactJs"
            />
          </div>
        </form>
        <ul data-testid="repository-list">
          {repositories.map((item) => (
            <Repositorie
              key={item.id}
              data={item}
              handleRemoveRepository={handleRemoveRepository}
            />
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
