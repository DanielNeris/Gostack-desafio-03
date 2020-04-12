import React from "react";
import { MdInfo } from "react-icons/md";

import "./styles.css";

export default function Repositories({ data, handleRemoveRepository }) {
  return (
    <li>
      <h2>{data.title}</h2>
      <div className="acitons">
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <MdInfo size={32} color="#000" />
        </a>

        <button onClick={() => handleRemoveRepository(data.id)}>Remover</button>
      </div>
    </li>
  );
}
