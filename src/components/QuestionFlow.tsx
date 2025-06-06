import React, { useState } from "react";
import { Question } from "../data/models/Questionnaire";
import { QuestionBlock } from "./QuestionBlock";

type QuestionFlowProps = {
  questions: Question[];
};

export const QuestionFlow: React.FC<QuestionFlowProps> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const percentageComplete = Math.round(
    (currentIndex / questions.length) * 100
  );

  const handleSelect = (choice: number) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = choice;
    setResponses(newResponses);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        console.log("Finished:", newResponses);
      }
    }, 300);
  };

  return (
    <div className="w-full  mx-auto bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-20 flex items-center">
        <p>Your progress - {percentageComplete}%</p>
        <div className="flex items-center justify-between px-6">
          <div className="relative h-10 w-52 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${percentageComplete}%` }}
            />
          </div>
        </div>
      </div>

      <QuestionBlock
        question={currentQuestion.title}
        percentageComplete={percentageComplete}
        selectedIndex={responses[currentIndex]}
        onSelect={handleSelect}
      />
    </div>
  );
};
