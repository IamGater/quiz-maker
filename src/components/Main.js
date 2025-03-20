import React, { useState } from "react";
import Card from "./Card";
import Btn from "./Btn";

export default function Main() {
  const [cards, setCards] = useState([
    { id: 1, name: "Quiz 1", description: "Description 1" },
    { id: 2, name: "Quiz 2", description: "Description 2" },
    { id: 3, name: "Quiz 3", description: "Description 3" },
    { id: 4, name: "Quiz 4", description: "Description 4" },
    { id: 5, name: "Quiz 5", description: "Description 5" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  const handleDelete = (id) => setCards(cards.filter((card) => card.id !== id));

  const handleSubmit = () => {
    if (quizName.trim() && quizDescription.trim()) {
      setCards([...cards, { id: Date.now(), name: quizName, description: quizDescription }]);
      setQuizName("");
      setQuizDescription("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="main">
      <div className="main-wrapper">
        {cards.map((card) => (
          <Card key={card.id} {...card} onDelete={handleDelete} />
        ))}
      </div>
      <div className="main-btn">
        <Btn onClick={() => setIsModalOpen(true)} />
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Create Quiz</h2>
              <div className="question">
                <label>Quiz Name:</label>
                <input
                  type="text"
                  placeholder="Enter quiz name"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                />
              </div>
              <div className="answers">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit} className="submit-btn">Submit</button>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}