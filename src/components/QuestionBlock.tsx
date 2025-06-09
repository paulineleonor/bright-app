import React from "react";

type QuestionBlockProps = {
  question: string;
  position: string;
  percentageComplete: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
};

const scaleLabels = ["Strongly Disagree", "", "", "", "Strongly Agree"];

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  question,
  position,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div>
      <div className="border-t border-gray-200 px-6 py-6 px-[100px] py-[50px]">
        <div className="flex pb-[50px]">
          <p className="text-orange-300 ds">Q{position}</p>
          <div className="ml-3">
            <p>In a job, I would be motivated by</p>
            <p className="text-lg font-medium text-gray-900 mb-6">{question}</p>
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0" />

          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${selectedIndex === i
                ? "bg-blue-500 border-blue-600"
                : "bg-white border-gray-400"
                }`}
              onClick={() => onSelect(i)}
            >
              {selectedIndex === i && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
          {scaleLabels.map((label, i) => (
            <span key={i} className={i === 2 ? "text-center w-full" : ""}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
