"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect } from "react";

function Questions({ mockQuestions, activeQuestion, setActiveQuestion }) {
  useEffect(() => {
    console.log(mockQuestions);
    console.log("xxxxxxxxxxxxxxxx");
    console.log(mockQuestions[activeQuestion]?.question);
  }, [mockQuestions, activeQuestion]);

  const textToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };

  return (
    mockQuestions && (
      <div className="p-5 border rounded-lg my-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockQuestions.map((question, index) => (
            <h2
              key={index}
              className={`p-2 border rounded-full text-center text-xs md:text-sm cursor-pointer ${
                activeQuestion === index && "bg-[#4845D2] text-white"
              }`}
              onClick={() => setActiveQuestion(index)}
            >
              Question# {index + 1}
            </h2>
          ))}
        </div>
        <h2 className="mt-10 text-md md:text-lg">
          {mockQuestions[activeQuestion]?.question}
        </h2>
        <Volume2
          onClick={() => textToSpeech(mockQuestions[activeQuestion]?.question)}
          className="my-5 cursor-pointer"
        />
        <div className="border rounded-lg p-5 bg-yellow-100 mt-20">
          <h2 className="flex gap-2 items-center text-yellow-500">
            <Lightbulb />
            <strong>Note : </strong>
          </h2>
          <h2 className="my-4">
            Click on the record button to start recording your answer. Once you
            have finished recording and clicked on the "Submit" button, you
            cannot re-record your answer for that question, so please record
            carefully. At the end of the interview, we will provide you with
            feedback based on your answers, along with the correct answers for
            each question.
          </h2>
        </div>
      </div>
    )
  );
}

export default Questions;
