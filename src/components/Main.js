import React, { useState } from "react";
import Card from "./Card";

export default function Main() {
  const [cards, setCards] = useState([
    { id: 1, name: "Quiz 1", description: "Description 1" },
    { id: 2, name: "Quiz 2", description: "Description 2" },
    { id: 3, name: "Quiz 3", description: "Description 3" },
    { id: 4, name: "Quiz 4", description: "Description 4" },
    { id: 5, name: "Quiz 5", description: "Description 5" },
  ]);

  const handleDelete = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="main">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          description={card.description}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
