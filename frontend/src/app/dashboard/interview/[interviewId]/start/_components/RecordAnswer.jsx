"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./style.css";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../../../../../../../utils/gemeniAi";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function RecordAnswer({ mockQuestions, ActiveQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [execute, setExecute] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const { user } = useUser();
  const router = useRouter();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer) {
      if (userAnswer.length < 10) {
        toast.warn("Recording length is too short. Please speak more.");
      } else {
        setIsDialogOpen(true);
      }
    }
  }, [userAnswer, isRecording]);

  useEffect(() => {
    if (execute) {
      UpdateUserAnswer();
    }
  }, [execute]);

  const handleRecord = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const handleCloseDialog = () => {
    setExecute(true);
    setIsDialogOpen(false);
    setAnsweredQuestions((prevSet) => new Set(prevSet.add(ActiveQuestion)));
  };

  const handleReRecord = () => {
    setUserAnswer("");
    setResults([]);
    setIsDialogOpen(false);
    startSpeechToText();
  };

  const UpdateUserAnswer = async () => {
    const feedbackPrompt = `Question: ${mockQuestions[ActiveQuestion]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give use rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`;
    console.log(feedbackPrompt);
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonfeedbackResp = JSON.parse(mockJsonResp);
    console.log(JsonfeedbackResp);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(
      interviewData?.mockId,
      mockQuestions[ActiveQuestion]?.question,
      mockQuestions[ActiveQuestion]?.answer,
      userAnswer,
      JsonfeedbackResp?.feedback,
      JsonfeedbackResp?.rating,
      user?.primaryEmailAddress?.emailAddress
    );
    const resp = await fetch("http://localhost:5000/user/user-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mockIdRef: interviewData?.mockId,
        question: mockQuestions[ActiveQuestion]?.question,
        answer: mockQuestions[ActiveQuestion]?.answer,
        userAnswer: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    console.log(resp);
    if (resp) {
      toast.success("Answer recorded successfully.");
    }
    setUserAnswer("");
    setResults([]);

    setExecute(false);
  };

  const handleSubmitInterview = () => {
    if (answeredQuestions.size === mockQuestions.length) {
      router.push(`/dashboard/interview/${interviewData?.mockId}/feedback`);
    } else {
      const remainingQuestions = [...Array(mockQuestions.length).keys()]
        .filter((i) => !answeredQuestions.has(i))
        .map((index) => index + 1);
      toast.warn(
        `Please answer the remaining question(s): ${remainingQuestions.join(
          ", "
        )}`
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center mt-5 bg-secondary rounded-lg p-5">
        <Webcam
          style={{ width: "100%", height: 300, zIndex: 10 }}
          mirrored={true}
        />
      </div>
      <button
        className={`cssbuttons-io-button my-5 ${
          answeredQuestions.has(ActiveQuestion) ? "cursor-not-allowed" : ""
        }`}
        onClick={handleRecord}
        disabled={answeredQuestions.has(ActiveQuestion)}
        onMouseOver={() => {
          if (answeredQuestions.has(ActiveQuestion)) {
            toast.info(
              "Answer has been recorded. Cannot re-record now. Please move to the next question."
            );
          }
        }}
      >
        {isRecording ? (
          <div className="flex gap-2">
            <Mic />
            Recording...
          </div>
        ) : (
          <div>Record answer</div>
        )}
      </button>
      {ActiveQuestion === mockQuestions.length - 1 && (
        <button
          className="cssbuttons-io-button my-5"
          onClick={handleSubmitInterview}
        >
          Submit Interview
        </button>
      )}
      <ToastContainer />
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[600px] p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
            <Dialog.Title className="text-xl font-semibold">
              Transcribed Text
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              This is what you have said. If you think there is any mistake, you
              can re-record your answer.
            </Dialog.Description>
            <p className="mt-4">{userAnswer}</p>
            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={handleCloseDialog}
                >
                  Submit
                </button>
              </Dialog.Close>
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleReRecord}
              >
                Re-record
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default RecordAnswer;
