"use client";
import React, { useEffect, useState } from "react";
import Questions from "./_components/Questions";
import RecordAnswer from "./_components/RecordAnswer";

function Start({ params }) {
  const [InterviewData, setInterviewData] = useState([]);
  const [info, setInfo] = useState([]);
  const [ActiveQuestion, setActiveQuestion] = useState(0);

  const getDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/mock-interview/${params.interviewId}`
      );
      const data = await response.json();
      setInfo(data);

      let questions = [];
      if (data.jsonMockResp) {
        questions =
          typeof data.jsonMockResp === "string"
            ? JSON.parse(data.jsonMockResp)
            : data.jsonMockResp;
      }

      setInterviewData(questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
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
    </div>
  );
}

export default Start;
