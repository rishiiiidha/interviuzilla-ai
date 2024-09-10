"use client";
import { db } from "@/neon";
import { interview } from "@/neon/schema";
import { eq, param } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import styles from "../../Dashboard.module.css";
import Button from "../_components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [interviewDetails, setInterviewDetails] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchInterviewContent = async () => {
      const response = await db
        .select()
        .from(interview)
        .where(eq(interview.interviewId, params.interviewId));
      setInterviewDetails(response[0]);
    };
    fetchInterviewContent();
  }, [params.interviewId]);

  return (
		<div className={styles.background}>
			<h2>Let&apos;s get started</h2>
			<div>
				<main className='flex justify-center items-center px-8 py-20 max-md:px-5'>
					<div className='px-14 w-full max-w-screen-xl max-md:px-5 max-md:max-w-full'>
						<div className='flex gap-5 max-md:flex-col'>
							<div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full mr-32 '>
								{webcamEnabled ? (
									<Webcam
										audio={true}
										onUserMedia={() => setWebcamEnabled(true)}
										onUserMediaError={() => setWebcamEnabled(false)}
										mirrored='false'
										style={{
											width: 900,
											marginTop: 50,
											marginRight: 100,
											borderRadius: "100%",
										}}
									/>
								) : (
									<Image
										src='/side-img.png'
										alt='Interview preparation visual'
										width='300'
										height='300'
										className='w-full  aspect-square max-md:mt-10 max-md:max-w-full'
									/>
								)}
							</div>
							<div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
								<div className='flex flex-col grow py-11 text-base font-bold text-white max-md:mt-10 max-md:max-w-full'>
									<h1 className='text-4xl font-semibold max-md:max-w-full max-md:text-4xl max-md:leading-[54px]'>
										Activate your webcam and microphone to begin the interview.
									</h1>
									<p className='mt-6 font-light leading-6 max-md:max-w-full'>
										Your AI-generated interview includes 5 questions. Ensure you
										record your answers to receive AI-generated feedback.
									</p>
									<button
										onClick={() => {
											setWebcamEnabled(true);
										}}
										className='self-start px-5 py-4 mt-6 whitespace-nowrap border border-solid bg-zinc-800 border-gray-950 rounded-[50px] tracking-[2px]'
									>
										ENABLE
									</button>
									<button
										onClick={() => {
											router.push(
												"/dashboard/interview/" + params.interviewId + "/start"
											);
										}}
										className='px-6 py-4 mt-6 bg-indigo-600 border border-violet-600 border-solid rounded-[50px] tracking-[2px] max-md:px-5 max-md:max-w-full'
									>
										DIVE INTO THE INTERVIEW FRENZY!
									</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Page;
