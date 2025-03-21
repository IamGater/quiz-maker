import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Btn from "./components/Btn";
import Header from "./components/Header";
import "./index.css";

function App() {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("quizzes");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", ""] },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(cards));
  }, [cards]);

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSubmit = () => {
    if (quizName.trim() && quizDescription.trim() && questions.length > 0) {
      const newQuiz = {
        id: Date.now(),
        name: quizName,
        description: quizDescription,
        questionCount: questions.length,
        questions: questions,
      };
      setCards([...cards, newQuiz]);
      setQuizName("");
      setQuizDescription("");
      setQuestions([{ question: "", answers: ["", ""] }]);
      setIsModalOpen(false);
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () =>
    setQuestions([...questions, { question: "", answers: ["", ""] }]);
  const addAnswer = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push("");
    setQuestions(updatedQuestions);
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    const savedAnswers = localStorage.getItem(`quiz-answers-${quiz.id}`);
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setSelectedAnswers(parsedAnswers);
      const submitted = quiz.questions.map((q, qIndex) => ({
        question: q.question,
        selectedAnswer: q.answers[parsedAnswers[qIndex]] || "No answer selected",
      }));
      setSubmittedAnswers(submitted);
    } else {
      setSelectedAnswers({});
      setSubmittedAnswers([]);
    }
  };

  const closeQuizModal = () => setSelectedQuiz(null);

  const handleAnswerSelect = (qIndex, aIndex) => {
    const updatedAnswers = { ...selectedAnswers, [qIndex]: aIndex };
    setSelectedAnswers(updatedAnswers);
    localStorage.setItem(
      `quiz-answers-${selectedQuiz.id}`,
      JSON.stringify(updatedAnswers)
    );
  };

  const handleQuizSubmit = () => {
    const answers = selectedQuiz.questions.map((q, qIndex) => ({
      question: q.question,
      selectedAnswer: q.answers[selectedAnswers[qIndex]],
    }));
    setSubmittedAnswers(answers);
  };

  const handleDeleteQuiz = (quizId) => {
    // Close modal if open
    setSelectedQuiz(null);
    // Delete the quiz from the list
    handleDelete(quizId);
  };

  return (
    <div className="App container">
      <Header />
      <div className="main">
        <div className="main-wrapper">
          {cards.map((card) => (
            <div key={card.id} onClick={() => handleQuizClick(card)}>
              <Card {...card} onDelete={handleDelete} />
            </div>
          ))}
        </div>

        {selectedQuiz && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{selectedQuiz.name}</h2>
              <p>{selectedQuiz.description}</p>

              {submittedAnswers.length === 0 ? (
                <div className="questions-display">
                  {selectedQuiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-item">
                      <h4>{q.question}</h4>
                      <ul className="modal-ul">
                        {q.answers.map((a, aIndex) => (
                          <li className="modal-wrapper" key={aIndex}>
                            <input
                              className="modal-input"
                              type="radio"
                              name={`question-${qIndex}`}
                              id={`answer-${qIndex}-${aIndex}`}
                              checked={selectedAnswers[qIndex] === aIndex}
                              onChange={() =>
                                handleAnswerSelect(qIndex, aIndex)
                              }
                            />
                            <label
                              className="modal-label"
                              htmlFor={`answer-${qIndex}-${aIndex}`}
                            >
                              {a}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button onClick={handleQuizSubmit} className="popup-submit">
                    Submit
                  </button>
                </div>
              ) : (
                <div className="submitted-answers">
                  <h3>Your Answers:</h3>
                  <ul className="answers-ul">
                    {submittedAnswers.map((ans, index) => (
                      <li key={index}>
                        <strong>{ans.question}</strong>:{" "}
                        {ans.selectedAnswer || "No answer selected"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={closeQuizModal}>Close</button>
              {/* Добавляем кнопку для удаления квиза */}
              <button
                onClick={() => handleDeleteQuiz(selectedQuiz.id)}
                className="delete-quiz-btn"
              >
                Delete Quiz
              </button>
            </div>
          </div>
        )}

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
                <div className="questions-section">
                  <h3>Questions:</h3>
                  {questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-item">
                      <input
                        type="text"
                        placeholder={`Enter question ${qIndex + 1}`}
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, e.target.value)
                        }
                      />
                      <div className="answers-section">
                        {q.answers.map((a, aIndex) => (
                          <input
                            key={aIndex}
                            type="text"
                            placeholder={`Answer ${aIndex + 1}`}
                            value={a}
                            onChange={(e) =>
                              handleAnswerChange(qIndex, aIndex, e.target.value)
                            }
                          />
                        ))}
                        <button
                          onClick={() => addAnswer(qIndex)}
                          className="add-answr"
                        >
                          Add Answer
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={addQuestion} className="add-quest">
                    Add Question
                  </button>
                </div>
                <button onClick={handleSubmit} className="submit-btn">
                  Submit
                </button>
                <button onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
