export type Question = {
    id: string;
    title: string;
}

export class Questionnaire {
    questions: Question[] = [];

    constructor(questions: Question[]) {
        this.questions = questions;
      }
}