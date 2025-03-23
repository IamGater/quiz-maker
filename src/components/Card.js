import React from "react";

export default function Card({ name, description, questionCount }) {
  return (
    <div className="card">
      <h3 className="card-name">{name}</h3>
      <p className="card-descr">{description}</p>
      <p className="card-questions">{questionCount}</p>
    </div>
  );
}
