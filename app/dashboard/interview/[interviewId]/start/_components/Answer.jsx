"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "@/gemini-model/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment"; // assuming moment is imported for date formatting
import { db } from "@/neon";

const Answer = ({ questions, activeQuestionIndex, interviewDetails }) => {
	const [userAnswer, setUserAnswer] = useState("");
	const [cameraAllowed, setCameraAllowed] = useState(true);
	const [microphoneAllowed, setMicrophoneAllowed] = useState(true);
	const { user } = useUser();
	const [loading, setLoading] = useState(false);

	const {
		error,
		interimResult,
		isRecording,
		results,
		startSpeechToText,
		stopSpeechToText,
	} = useSpeechToText({
		continuous: true,
		useLegacyResults: false,
	});

	// Append recognized speech results to the user's answer
    useEffect(() => {
        // console.log(interviewDetails)
		results.forEach((result) => {
			setUserAnswer((prevAnswer) => prevAnswer + result.transcript);
		});
	}, [results]);

	// Auto-update answer if it's more than 10 characters long
	useEffect(() => {
		if (!isRecording && userAnswer.length >= 10) {
			mockUserAnswerUpdate();
		}
	}, [userAnswer]);

	const stopRecording = async () => {
		if (isRecording) {
			stopSpeechToText();
			if (!isRecording && userAnswer.length < 10) {
				setLoading(false);
				toast.error("Answer is too short! Please provide more details.", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "dark",
				});
				return;
			}
		} else {
			startSpeechToText();
		}
	};
    const mockUserAnswerUpdate = async () => {
			setLoading(true);
			try {
				const mockResponse = {
					rating: Math.floor(Math.random() * 5) + 1,
					feedback: "Good answer, but try to provide more details next time.",
				};

				toast.success(
					`Rating: ${mockResponse.rating}, Feedback: ${mockResponse.feedback}`,
					{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "dark",
					}
				);

				setUserAnswer("");
			} catch (error) {
				console.error("Error updating user answer: ", error);
				toast.error("Failed to generate feedback. Please try again later.");
			} finally {
				setLoading(false);
			}
    };
//     const updateUserAnswer = async () => {
// 		setLoading(true);
// 		try {
// 			const feedbackPrompt = 
// 				Question: ${questions[activeQuestionIndex].question}
// 				User answer: ${userAnswer}
// 				Based on the question and user answer, please provide a rating for the answer and feedback in 2 to 3 lines. Return only JSON format with rating and feedback fields. No additional explanation.
// 			;

// 			const result = await chatSession.sendMessage(feedbackPrompt);
// 			const jsonResponse = result.response
// 				.text()
// 				.replace("
// json", "")
// 				.replace("
// ", "");
// 			const jsonFeedbackResponse = JSON.parse(jsonResponse);

		
// 			if (response) {
// 				toast.success("User answer recorded successfully.");
// 				setUserAnswer("");
// 			}
// 		} catch (error) {
// 			console.error("Error updating user answer: ", error);
// 			toast.error("Failed to record answer. Please try again later.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};



	useEffect(() => {
		navigator.permissions.query({ name: "camera" }).then((permission) => {
			setCameraAllowed(permission.state === "granted");
		});
		navigator.permissions.query({ name: "microphone" }).then((permission) => {
			setMicrophoneAllowed(permission.state === "granted");
		});
	}, []);

	return (
		<div className='text-white flex flex-col justify-center items-center rounded-lg'>
			<ToastContainer />
			{!cameraAllowed && (
				<div className='text-red-500 mb-4'>
					Camera access is required to use this feature. Please enable camera
					access in your browser settings.
				</div>
			)}
			{!microphoneAllowed && (
				<div className='text-red-500 mb-4'>
					Microphone access is required to record your answer. Please enable
					microphone access in your browser settings.
				</div>
			)}

			{cameraAllowed && (
				<Webcam
					mirrored={true}
					style={{
						height: 400,
						width: "100%",
						zIndex: 10,
						transform: "translateY(-120px)",
					}}
				/>
			)}

			<div>
				{microphoneAllowed && (
					<button
						type='button'
						onClick={stopRecording}
						className='py-2.5 px-5 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border hover:border-gray-500 border-gray-700 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-950 dark:border-gray-600 dark:text-white dark:hover:bg-gray-950'
					>
						{isRecording ? "Stop Recording" : "Record Answer"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Answer;
