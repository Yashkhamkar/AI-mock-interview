"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import "./interview.css";

function Interview({ params }) {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState({});
  const router = useRouter(); // Initialize useRouter

  const getDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mock-interview/${params.interviewId}`
      );
      const data = await response.json();
      setInterviewData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [params.interviewId]); // Added dependency array

  const startInterview = () => {
    router.push(`/dashboard/interview/${params.interviewId}/start`);
  };

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 p-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">
              Enable your webcam and microphone to start your AI-generated Mock
              interview. It has 5 questions which you can answer and at last,
              you will get a report based on your answers. NOTE: We never record
              your video or audio.
            </h2>
          </div>
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{ height: 300, width: 300, marginLeft: "130px" }}
              className="rounded-lg"
              mirrored={true}
            />
          ) : (
            <>
              <WebcamIcon
                className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border cursor-pointer"
                onClick={() => setWebcamEnabled(true)} // Allow icon click to enable webcam
              />
              <button
                className="cssbuttons-io-button"
                style={{ marginLeft: "195px" }}
                onClick={() => setWebcamEnabled(true)}
              >
                <div>Enable cam & mic</div>
              </button>
            </>
          )}
          {webcamEnabled && (
            <button
              className="cssbuttons-io-button mt-5"
              style={{ marginLeft: "195px" }}
              onClick={startInterview}
            >
              <div>Start Interview</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
