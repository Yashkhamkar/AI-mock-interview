"use client";
import React, { useEffect, useState } from "react";
import Questions from "./_components/Questions";
import RecordAnswer from "./_components/RecordAnswer";
import { toast, ToastContainer } from "react-toastify";

function Start({ params }) {
  const [InterviewData, setInterviewData] = useState([]);
  const [info, setInfo] = useState([]);
  const [ActiveQuestion, setActiveQuestion] = useState(0);

  const GetInterviewDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mock-interview/${params.interviewId}`
      );
      const result = await response.json();
      const jsonMockResp = JSON.parse(result.jsonMockResp);
      console.log(jsonMockResp);
      setInterviewData(jsonMockResp);
      setInfo(result);
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching interview details");
    }
  };

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Questions
          mockQuestions={InterviewData}
          activeQuestion={ActiveQuestion}
          setActiveQuestion={setActiveQuestion}
        />
        <RecordAnswer
          mockQuestions={InterviewData}
          ActiveQuestion={ActiveQuestion}
          interviewData={info}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Start;
