"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { toast, ToastContainer } from "react-toastify";
function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getInterviews();
    }
  }, [user]);

  const getInterviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mock-interviews?email=${user?.primaryEmailAddress?.emailAddress}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setInterviewList(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching interviews");
      console.error("Error fetching interviews:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#4845d2] mx-auto"></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p class="text-zinc-600 dark:text-zinc-400">
              Server is loading please wait
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default InterviewList;
