"use client"
import React from 'react'

const Questions = ({ questions, activeQuestionIndex }) => {
  return (
    <div className="p-5 border rounded-lg">
      <div>
        {questions &&
          questions.map((question, index) => (
            <div key={index}>
              <h2 className={`p-2 rounded-full bg-slate-600 ${activeQuestionIndex==index && 'bg-gray-900'}`}>
                Question {index + 1} :{" "}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Questions