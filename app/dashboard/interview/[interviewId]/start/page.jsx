"use client"
import { db } from '@/neon';
import { interview } from '@/neon/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Questions from './_components/Questions'

const Page = ({ params }) => {
  const [interviewDetails, setInterviewDetails] = useState()
  const [questions, setQuestions] = useState()
  const [activeQuestionIndex,setActiveQuestionIndex] =useState(0)
    useEffect(() => {
      const fetchInterviewContent = async () => {
        const response = await db
          .select()
          .from(interview)
          .where(eq(interview.interviewId, params.interviewId));
        const JsonResponse = JSON.parse(response[0].jsonquestionsrespnse)
        setInterviewDetails(response[0])
        setQuestions(JsonResponse);
        console.log(JsonResponse)
      };
      fetchInterviewContent();
    }, [params.interviewId]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Questions */}
        <Questions questions={questions} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex} />
        {/* video / audio recording  */}

      </div>
    </div>
  )
}

export default Page