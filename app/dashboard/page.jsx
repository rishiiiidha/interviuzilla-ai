"use client";
import React, { use, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import Loader from './_components/Loader'
import { chatSession } from "../../gemini-model/GeminiAIModel";
import { db } from "@/neon";
import {v4 as uuidv4} from "uuid"
import { useUser } from "@clerk/nextjs";
import moment from "moment"
import { interview } from "@/neon/schema";
import { useRouter } from "next/navigation";

const Page = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([])
  const {user} = useUser()
  const router = useRouter()
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); 
  };

  const handleClick = async () => {
    if(file) setLoading(true)
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);

    try {
      const response = await axios.post(
				"https://v2.convertapi.com/convert/pdf/to/txt?Secret=secret_mcmx66vWuGSUVC6z",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
      const fileData = response.data.Files[0].FileData;
      const decodedText = atob(fileData);
      const inputPrompt =
        decodedText + "based on the given text return the " + process.env.NEXT_PUBLIC_HR_INTERVIEW_QUESTIONS + " HR Interview questions with answers in json format no need of any explanation of answer just give questions and its answer in the json format";
      const result = await chatSession.sendMessage(inputPrompt);
      const jsonquestionsresponse = result.response.text().replace('```json','').replace('```','')
      setResponse(jsonquestionsresponse);
      if (jsonquestionsresponse) {
        const uploadResponse = await db
          .insert(interview)
          .values({
            interviewId: uuidv4(),
            jsonresponse: decodedText,
            jsonquestionsrespnse: jsonquestionsresponse,
            createdBy: user.primaryEmailAddress.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ interviewId: interview.interviewId });
        console.log(uploadResponse);
        if (uploadResponse) {
          router.push('/dashboard/interview/' + uploadResponse[0].interviewId)
        }
      }
      else {
        alert('Error in uploading database')
      }

    } catch (error) {
      console.error("Error converting file:", error);
    }
    setLoading(false)
  };

  return (
    <div className={styles.background}>
      {!loading && (
        <form className="flex items-end flex-col mt-52">
          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center md:w-[500px] w-[350px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-950 dark:bg-gray-950 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload your Resume</span> 
                </p>
                {!fileName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Upload your resume (MAX. 30mb)
                  </p>
                )}
                {fileName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fileName}
                  </p>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden relative"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            onClick={handleClick}
            type="button"
            className="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border hover:border-gray-500 border-gray-700 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-950  dark:border-gray-600 dark:text-white dark:hover:bg-gray-950"
          >
            Start Your Interview
          </button>
        </form>
      )}
      {loading && (
        <div className="mt-64">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Page;
