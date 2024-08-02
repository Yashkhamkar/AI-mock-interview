"use client";
import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";
import "./style.css";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upgrade = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleUpgrade = async () => {
    setLoading(true);
    if (!user) {
      toast.error("Please sign in to upgrade your account.");
      setLoading(false);
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/upgrade`,
        {
          email: user.primaryEmailAddress?.emailAddress,
          amount: isMonthly ? 5 : 40,
        }
      );
      if (response.data.paymentLink) {
        window.location.href = response.data.paymentLink;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen p-6">
        <ToastContainer />
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#2B2B2F]">Upgrade</h1>
          <p className="text-lg text-[#5F5D6B] mt-2">
            Upgrade to monthly plan to access unlimited mock interview
          </p>
        </div>
        <div className="modal w-full max-w-[450px] bg-gradient-to-b from-[#DCF9E0] to-[#FFFFFF] shadow-lg rounded-lg p-6">
          <form
            className="form flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpgrade();
            }}
          >
            <div className="banner bg-cover bg-center h-8"></div>
            <label className="title font-bold text-lg text-center text-[#2B2B2F]">
              Elevate Your Interview Skills
            </label>
            <p className="description mx-auto font-semibold text-xs text-center text-[#5F5D6B] max-w-[80%]">
              Unlock unlimited access to AI-powered mock interviews and get
              valuable feedback to improve your performance. Upgrade now for
              comprehensive interview preparation!
            </p>
            <div className="tab-container flex flex-row items-start relative p-1 bg-[#ebebec] rounded-lg my-2 mx-5">
              <button
                type="button"
                className={`tab tab--1 ${isMonthly ? "tab--active" : ""}`}
                onClick={() => setIsMonthly(true)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`tab tab--2 ${!isMonthly ? "tab--active" : ""}`}
                onClick={() => setIsMonthly(false)}
              >
                Annual
              </button>
              <div
                className={`indicator ${
                  isMonthly ? "indicator--monthly" : "indicator--annual"
                }`}
              ></div>
            </div>
            <div className="benefits flex flex-col gap-5 p-5">
              <span className="text-lg font-bold text-[#2B2B2F]">
                What we offer
              </span>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                  >
                    <rect fill="black" rx="8" height="16" width="16"></rect>
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M5 8.5L7.5 10.5L11 6"
                    ></path>
                  </svg>
                  <span className="font-semibold text-xs text-[#5F5D6B]">
                    Unlimited mock interviews with AI-powered feedback
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                  >
                    <rect fill="black" rx="8" height="16" width="16"></rect>
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M5 8.5L7.5 10.5L11 6"
                    ></path>
                  </svg>
                  <span className="font-semibold text-xs text-[#5F5D6B]">
                    Access to a wide range of interview questions and scenarios
                  </span>
                </li>
              </ul>
            </div>
            <div className="modal--footer flex items-center justify-between p-5 border-t border-[#ebebec]">
              <label className="price relative font-extrabold text-4xl text-[#2B2B2F]">
                <sup className="text-xs">$</sup>
                {isMonthly ? "5" : "40"}
                <sub className="absolute bottom-1 text-xs text-[#5F5D6B]">
                  /{isMonthly ? "mo" : "yr"}
                </sub>
              </label>
              <button
                type="submit"
                className="upgrade-btn flex items-center justify-center w-[215px] h-10 bg-green-600 text-white font-semibold rounded-md transition-all hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Processing..." : "Upgrade to PRO"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upgrade;
