import React from "react";
import Head from "next/head";
import Header from "../Header";

function Working() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-16  min-h-screen">
        <h2 className="text-4xl font-bold text-center text-[#4845D2] mb-5">
          How It Works?
        </h2>
        <h3 className="text-md text-center mb-7 text-gray-500">
          Give mock interview in just 3 simple easy steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#4845D2]">
              Sign Up or Sign In
            </h3>
            <p className="text-gray-600">
              Create an account or sign in to access the platform. This step
              ensures that you can save your progress and receive personalized
              feedback.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#4845D2]">
              Fill Out Your Profile
            </h3>
            <p className="text-gray-600">
              Complete the form on your dashboard by filling in your job
              title/position, job description/tech stack, and years of
              experience. This information helps generate relevant interview
              questions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#4845D2]">
              Answer and Get Feedback
            </h3>
            <p className="text-gray-600">
              Answer the 5 generated questions using your camera and mic. The
              questions range from easy to hard based on your profile. After the
              interview, receive detailed feedback to improve your skills.
            </p>
          </div>
        </div>
        <div className="text-center mt-16">
          <button className="bg-[#4845D2] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </>
  );
}

export default Working;
