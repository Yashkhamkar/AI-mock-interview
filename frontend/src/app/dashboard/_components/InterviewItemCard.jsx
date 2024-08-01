import Link from "next/link";
import React from "react";

function InterviewItemCard({ interview }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="border shadow-sm rounded-lg p-3 mb-4">
      <h2 className="font-bold text-[#4845D2]">{interview.jobPosition}</h2>
      <h2 className="text-gray-500">
        Years of Experience: {interview.jobExperience}
      </h2>
      <h2 className="text-gray-500">
        Created At: {formatDate(interview.createdAt)}
      </h2>
      <div className="mt-4 flex space-x-4">
        <Link href={`/dashboard/interview/${interview?.mockId}/feedback`}>
          <button className="py-2 px-4 border border-[#4845D2] rounded-md text-[#4845D2] bg-white hover:bg-gray-100">
            Feedback
          </button>
        </Link>
        <Link href={`/dashboard/interview/${interview?.mockId}`}>
          <button className="py-2 px-4 rounded-md text-white bg-[#4845D2] hover:bg-[#3c3ac1]">
            Retake test
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewItemCard;
