"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./feedback.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(null);

  const getUserFeedback = async () => {
    try {
      // Fetch user feedback from the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-answer?mockId=${params.interviewId}`
      );
      const data = await response.json();
      console.log(data);
      if (data.error || !Array.isArray(data)) {
        console.error(data.error || "Unexpected data format");
        toast.error("Please complete the interview to get feedback");
        setFeedbackList([]); // Ensure feedbackList is an array
      } else {
        setFeedbackList(data);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
      toast.error("Failed to fetch feedback, please try again later.");
      setFeedbackList([]); // Ensure feedbackList is an array
    }
  };

  useEffect(() => {
    getUserFeedback();
  }, []);

  const toggleFeedback = (index) => {
    setOpenFeedback(openFeedback === index ? null : index);
  };

  const calculateAverageRating = () => {
    if (feedbackList.length === 0) return 0;
    const totalRating = feedbackList.reduce((acc, feedback) => {
      const rating = parseFloat(feedback.rating);
      return acc + (isNaN(rating) ? 0 : rating);
    }, 0);
    return (totalRating / feedbackList.length).toFixed(1);
  };

  return (
    <div className="p-10">
      {feedbackList.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-green-400">Congratulations</h2>
          <h2 className="text-2xl font-bold">
            Here is your AI interview feedback
          </h2>
          <h2 className="text-lg my-3 text-[#4845D2]">
            Your overall interview rating:-
            <strong>{calculateAverageRating()}/10</strong>
          </h2>

          {feedbackList.map((feedback, index) => (
            <div key={index} className="my-4">
              <button
                className="w-full text-left py-2 px-4 bg-gray-200 rounded-md flex justify-between items-center"
                onClick={() => toggleFeedback(index)}
              >
                <span>{feedback.question}</span>
                <span>
                  {openFeedback === index ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              <div
                className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
                  openFeedback === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg my-2">
                    <strong>Rating: </strong>
                    {feedback.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {feedback.userAnswer}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer Looks Like: </strong>
                    {feedback.answer}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback: </strong>
                    {feedback.feedback}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="text-2xl font-bold text-red-400">
          Please complete your interview fully to get feedback
        </h2>
      )}
      <Link href="/dashboard">
        <button type="button" className="cssbuttons-io-button mt-10">
          Go Home
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
}

export default Feedback;
