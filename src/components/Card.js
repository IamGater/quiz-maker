import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

export default function Card({ name, description, questionCount }) {
  return (
    <div className="card">
      <h3 className="card-name">{name}</h3>
      <p className="card-descr">{description}</p>
      <p className="card-questions">{questionCount}</p>
    </div>
  );
}
