export type Question = {
  id: string;
  text: string;
};

export type Answer = {
  questionId: string;
  answer: number;
};

export class Questionnaire {
  questions: Question[] = [];
  answers: Answer[] = [];

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  addAnswer(questionId: string, answer: number) {
    const existingIndex = this.answers.findIndex(
      (a) => a.questionId === questionId
    );
    if (existingIndex !== -1) {
      this.answers[existingIndex].answer = answer;
    } else {
      this.answers.push({ questionId, answer });
    }
  }

  getAnswer(questionId: string): number | undefined {
    return this.answers.find((a) => a.questionId === questionId)?.answer;
  }

  isComplete(): boolean {
    return this.answers.length === this.questions.length;
  }
}
