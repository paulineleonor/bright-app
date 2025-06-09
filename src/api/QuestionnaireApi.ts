import { Answer } from "../data/models/Questionnaire";

export type QuestionsApiResponse = {
  ok: boolean;
  questions: {
    id: string;
    text: string;
  }[];
};

export type QuestionnaireAnswerApiResponse = {
  ok: boolean;
  latestSubmission: {
    date: string;
  };
};

export class QuestionnaireApi {
  static async loadQuestions(user: string): Promise<QuestionsApiResponse> {
    const res = await fetch(
      `https://fhc-api.onrender.com/questions?user=${user}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch questions for user ${user}`);
    }

    const data = await res.json();

    return data;
  }

  static async submitAnswers(user: string, body: { answers: Answer[] }) {
    const res = await fetch(
      `https://fhc-api.onrender.com/submissions?user=${user}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    return await res.json();
  }

  static async loadLatestResult(
    user: string
  ): Promise<QuestionnaireAnswerApiResponse | null> {
    const res = await fetch(
      `https://fhc-api.onrender.com/submissions?user=${user}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch latest answer for user ${user}`);
    }

    const data = await res.json();

    return data.ok ? data : null;
  }
}
