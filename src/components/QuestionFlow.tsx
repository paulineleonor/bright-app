import React, { useState } from "react";
import { Question } from "../data/models/Questionnaire";
import { QuestionBlock } from "./QuestionBlock";
import { QuestionnaireController } from "../data/controllers/QuestionnaireController";
import { useSearchParams } from "react-router-dom";

type QuestionFlowProps = {
  questions: Question[];
  controller: QuestionnaireController;
};

export const QuestionFlow: React.FC<QuestionFlowProps> = ({ questions, controller }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");

  const currentQuestion = questions[currentIndex];

  const percentageComplete = Math.round(
    (currentIndex / questions.length) * 100
  );

  const handleSelect = (choice: number) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = choice;
    setResponses(updatedResponses);

    // Save to controller
    controller.addAnswer(currentQuestion.id, choice);

    // Move to next question (unless last one)
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const handleFinish = async () => {
    if (!user) return;

    try {
      await controller.submit(user);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };


  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Submission complete!
        </h2>
        <p>Thanks for completing the test 🎉</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-20 flex items-center p-6">
        <p>Your progress - {percentageComplete}%</p>
        <div className="flex items-center justify-between px-6">
          <div className="relative h-[10px] w-52 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${percentageComplete}%` }}
            />
          </div>
        </div>
      </div>

      <QuestionBlock
        question={currentQuestion.text}
        position={`${currentIndex + 1}/${questions.length}`}
        percentageComplete={percentageComplete}
        selectedIndex={responses[currentIndex]}
        onSelect={handleSelect}
      />

      {/* Finish button on last question */}
      {currentIndex === questions.length - 1 && (
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={handleFinish}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};
