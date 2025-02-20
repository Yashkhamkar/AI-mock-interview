"use client";
import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { chatSession } from "../../../../utils/gemeniAi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const checkUserStatus = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/user-status?email=${user.primaryEmailAddress.emailAddress}`
    );
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userStatus = await checkUserStatus();
    const currentDate = new Date();
    if (userStatus.subscriptionStatus == undefined) {
      userStatus.subscriptionStatus = "free";
    }

    if (
      userStatus.subscriptionStatus === "free" &&
      userStatus.interviewCount >= 3
    ) {
      toast.error("Please upgrade to premium to create a new interview");
      setDialogOpen(false);
      return;
    }

    if (
      (userStatus.subscriptionStatus === "monthly" ||
        userStatus.subscriptionStatus === "yearly") &&
      new Date(userStatus.subscriptionExpiration) <= currentDate
    ) {
      toast.error(
        "Your subscription has expired. Please renew to create a new interview"
      );
      setDialogOpen(false);
      return;
    }

    setDialogOpen(false);
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${yearsOfExperience}, Depends on Job Position, Job Description and Years of Experience give us 5 Interview question along with Answer in JSON format, Give us question and Answer field on JSON, Each question and answer should be in the format:
      {
        "question": "Your question here",
        "answer": "Your answer here"
      }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log("Response Text: ", responseText);

      // Attempt to find a JSON array in the response
      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }

      const jsonResponsePart = jsonMatch[0];
      console.log("JSON Response Part: ", jsonResponsePart);

      try {
        const mockResponse = JSON.parse(jsonResponsePart.trim());
        const jsonString = JSON.stringify(mockResponse);
        console.log("JSON String: ", jsonString);

        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mock-interview`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonMockResp: jsonString,
              jobPosition,
              jobDescription,
              jobExperience: yearsOfExperience,
              createdBy: user.primaryEmailAddress?.emailAddress,
            }),
          }
        );

        const data = await resp.json();
        console.log("Response Data: ", data);
        router.push(`/dashboard/interview/${data.mockId}`);
      } catch (jsonError) {
        console.error("JSON Parsing Error: ", jsonError.message);
        toast.error("An error occurred while processing the JSON response.");
      }
    } catch (error) {
      console.error("Error in inserting", error);
      toast.error("An error occurred while processing the request.");
    }

    setJobDescription("");
    setJobPosition("");
    setYearsOfExperience("");
    setLoading(false);
  };

  return (
    <div>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
            <h2 className="text-lg text-center">+ Add New</h2>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[600px] p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-xl font-semibold">
              Tell us more about the job you're interviewing for
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              Add details about the job position, your skills, and experience
            </Dialog.Description>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Job Position / Role
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full bg-gray-200 border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none"
                  placeholder="Enter job position"
                  value={jobPosition}
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Job Description / Tech Stack
                </label>
                <textarea
                  className="mt-1 block w-full bg-gray-200 border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none"
                  placeholder="Enter job description and tech stack"
                  value={jobDescription}
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full bg-gray-200 border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none"
                  placeholder="Enter years of experience"
                  value={yearsOfExperience}
                  required
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Start Interview
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#4845d2] mx-auto"></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p class="text-zinc-600 dark:text-zinc-400">
              Your interview is about to begin
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddNewInterview;
