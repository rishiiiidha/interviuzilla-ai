"use client";
import React, { useState } from "react";
import { FaLightbulb, FaVolumeDown } from "react-icons/fa";

const Questions = ({ questions, activeQuestionIndex,setActiveQuestionIndex }) => {
	// const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

	const handleQuestionClick = (index) => {
		setActiveQuestionIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	// Function to handle text-to-speech
	const handleSpeak = (text) => {
		if (window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = "en-US"; // You can set the language here
			window.speechSynthesis.speak(utterance);
		} else {
			alert("Speech Synthesis not supported in this browser.");
		}
	};

	return (
		<div className='p-6 bg-black min-h-screen ml-28 mt-20'>
			<div className='flex flex-col space-y-4'>
				{questions &&
					questions.map((question, index) => (
						<div
							key={index}
							onClick={() => handleQuestionClick(index)}
							className={`flex flex-col p-4 rounded-lg border cursor-pointer ${
								activeQuestionIndex === index
									? "bg-gray-900 border-gray-600 text-white"
									: "bg-black border-gray-700 text-gray-300"
							} transition-all duration-300 ease-in-out`}
						>
							<div className='flex items-center gap-3'>
								<h2 className='text-lg font-semibold mb-2'>
									Question {index + 1}
								</h2>
								<div
									className='text-white mb-2 size-4 cursor-pointer'
									onClick={(e) => {
										e.stopPropagation(); // Prevent triggering the question toggle
										handleSpeak(question.question); // Speak the question
									}}
								>
									<FaVolumeDown />
								</div>
							</div>
							{activeQuestionIndex === index && (
								<p className='text-sm'>{question.question}</p>
							)}
						</div>
					))}
				<div className='border border-gray-600 rounded-lg p-5 bg-gray-700 my-10'>
					<h2 className='text-white flex gap-2 items-center'>
						<FaLightbulb />
						<strong>Note :</strong>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default Questions;
