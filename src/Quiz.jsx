// src/Quiz.js
import React, { useState, useEffect } from 'react';

const questions = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'Berlin'], answer: 'Paris' },
  { question: 'Which continent is Egypt in?', options: ['Asia', 'Africa', 'Europe', 'Australia'], answer: 'Africa' },
  { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 'Nile' },
  { question: 'Which is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
  { question: 'Which country has the largest population?', options: ['India', 'USA', 'China', 'Russia'], answer: 'China' },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setShowScore(true);
    }
  };

  const handleRetest = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setTimeLeft(10);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {showScore ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">You scored {score} out of {questions.length}</div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRetest}>Retest</button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="mb-4">
            <div className="text-xl font-bold">{questions[currentQuestion].question}</div>
            <div className="mt-2 text-gray-600">Time left: {timeLeft} seconds</div>
          </div>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
