import React from "react";

type QuestionBlockProps = {
  question: string;
  percentageComplete: number; // e.g. 40
  selectedIndex?: number; // 0 to 4
  onSelect: (index: number) => void;
};

const scaleLabels = ["Strongly Disagree", "", "Neutral", "", "Strongly Agree"];

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  question,
  percentageComplete,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div className="">


      <div className="border-t border-gray-200 px-6 py-6">
        <p className="text-lg font-medium text-gray-900 mb-6">{question}</p>

        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0" />

          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selectedIndex === i
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

        {/* Scale labels */}
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
