import React, { PropsWithChildren, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { QuestionnaireController } from "../data/controllers/QuestionnaireController";
import { Question } from "../data/models/Questionnaire";
import { Card } from "./Card";
import { QuestionFlow } from "./QuestionFlow";

export const PageLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new QuestionnaireController();

    controller
      .load("user123") // Replace with actual user ID
      .then(() => {
        const loadedQuestions = controller.getQuestions();
        setQuestions(loadedQuestions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setError("Could not load questionnaire.");
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      icon: "/src/assets/icons/clipboard-question.svg",
      borderColour: "#F59349",
      backgroundColour: "#FFF9F4",
      title: "24 questions",
      copy: "Answer 24 questions about your working style and career preferences.",
    },
    {
      icon: "/src/assets/icons/stopwatch.svg",
      borderColour: "#BCA9FF",
      backgroundColour: "#F9F7FE",
      title: "2 minutes",
      copy: "Gain insights into your future career in just two minutes.",
    },
    {
      icon: "/src/assets/icons/scissor-cutting.svg",
      borderColour: "#FFCD3C",
      backgroundColour: "#FCF9EF",
      title: "Personalised advice",
      copy: "Receive personalised advice to guide you on your next steps.",
    },
  ];

  return (
    <>
      <div className="h-[250px] w-full relative flex flex-col justify-end pl-[60px] pb-[40px]">
        <img
          src="/src/assets/icons/discover-journey-maze.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10 bg-[#F1F4F7]"
          aria-hidden="true"
        />

        <h1 className="text-4xl font-semibold pb-4">Career path test</h1>
        <p className="text-[#7F7F81]">
          Discover careers that match your skills and personality
        </p>
      </div>

      <div className="flex px-20 py-10 pl-30 gap-10">
        {cards.map((c) => (
          <Card
            icon={c.icon}
            borderColour={c.borderColour}
            title={c.title}
            copy={c.copy}
            bgColour={c.backgroundColour}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 text-[#7F7F81] px-20">
        <p>
          We've analysed data from thousands of our members who work in graduate
          roles across a range of sectors to understand which personalities,
          skills and values best fit each career path.
        </p>
        <p>
          Take this test to understand what career path you might be suited to
          and how to get started.
        </p>
      </div>

      <div className="px-20 pt-10">
        {questions.length > 0 && <QuestionFlow questions={questions} />}
      </div>
    </>
  );
};
