"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Header from "../Header";
import "./faq.css";
const faqs = [
  {
    question: "How does the mock AI interview work?",
    answer:
      "The mock AI interview simulates a real interview environment where you answer questions posed by our AI. After completing the interview, you receive detailed feedback on your performance.",
  },
  {
    question: "What should I prepare before my interview?",
    answer:
      "You should be prepared with your resume, any relevant experience or projects, and be ready to answer common interview questions. Ensure your tech setup is working well.",
  },
  {
    question: "How is the feedback provided?",
    answer:
      "Feedback is provided through a detailed analysis of your responses. It includes ratings, suggestions for improvement, and examples of what a good answer looks like.",
  },
  {
    question: "Can I reattempt an interview?",
    answer:
      "Yes, you can reattempt interviews. Your subscription plan will determine how many attempts you have.",
  },
  {
    question: "What are the different pricing tiers, and what do they include?",
    answer:
      "We offer several pricing tiers. For example, the basic plan allows 3 interviews, while premium plans offer more interviews and additional features. Check our 'Upgrade' page for detailed pricing.",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "To upgrade your plan, visit the 'Upgrade' page on our site and choose the plan that best suits your needs. Follow the instructions to complete the payment and upgrade process.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via the 'Contact Us' page or send an email to yashkhamkar1100@gmail.com.",
  },
  {
    question: "What should I do if I encounter technical issues?",
    answer:
      "If you encounter technical issues, try our troubleshooting guide available on the 'Help' page. If problems persist, contact our support team for assistance.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we prioritize your data security. We use encryption and other security measures to protect your information.",
  },
  {
    question: "How often are new features added?",
    answer:
      "We regularly update our platform with new features based on user feedback and technological advancements. Stay tuned to our blog for updates.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if the same question is clicked again
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <Header />
      <div className="p-10">
        <h2 className="text-3xl font-bold text-[#4845D2] flex items-center justify-content">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="my-4">
            <button
              className="w-full text-left py-2 px-4 bg-gray-200 rounded-md flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            <div
              className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-2 border rounded-lg bg-gray-50 text-sm text-gray-900">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQ;
