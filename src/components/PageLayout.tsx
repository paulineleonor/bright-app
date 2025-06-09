import React, { PropsWithChildren, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { QuestionnaireController } from "../data/controllers/QuestionnaireController";
import { mockUsers } from "../data/controllers/UserController";
import { Question } from "../data/models/Questionnaire";
import { User } from "../data/models/User";
import { Card } from "./Card";
import { Completed } from "./Completed";
import { QuestionFlow } from "./QuestionFlow";

export const PageLayout: FunctionComponent = ({
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user");
  const [controller] = useState(new QuestionnaireController());

  useEffect(() => {
    if (!user) {
      setSearchParams({ user: "batman" });
    }
  }, [user, setSearchParams]);

  useEffect(() => {
    if (!user) return;

    const foundUser = mockUsers.find((u) => u.name === user);
    if (!foundUser) {
      setError("User not found.");
      return;
    }

    setCurrentUser(foundUser);

    controller
      .load(user)
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
  }, [user]);

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

      {/* add loading and error components  */}
      <div className="px-20 py-10">
        {currentUser && !currentUser.dateCompleted && questions.length > 0 && <QuestionFlow questions={questions} controller={controller} />}
        {currentUser && currentUser.dateCompleted && <Completed date={currentUser.dateCompleted} />}
      </div>
    </>
  );
};
