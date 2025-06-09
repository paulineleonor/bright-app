import { QuestionnaireApi } from "../../api/QuestionnaireApi";
import { Questionnaire } from "../models/Questionnaire";

export class QuestionnaireController {
  private questionnaire: Questionnaire | null = null;

  async load(user: string): Promise<void> {
    const response = await QuestionnaireApi.loadQuestions(user);
    if (!response.ok) throw new Error("Failed to load questionnaire");
    this.questionnaire = new Questionnaire(response.questions);
  }

  getQuestions() {
    if (!this.questionnaire) throw new Error("Questionnaire not loaded");
    return this.questionnaire.questions;
  }

  getCurrentQuestionIndex(): number {
    if (!this.questionnaire) throw new Error("Questionnaire not loaded");
    return this.questionnaire.answers.length;
  }

  addAnswer(questionId: string, answer: number) {
    if (!this.questionnaire) throw new Error("Questionnaire not loaded");
    this.questionnaire.addAnswer(questionId, answer);
  }

  getAnswers() {
    if (!this.questionnaire) throw new Error("Questionnaire not loaded");
    return this.questionnaire.answers;
  }

  async submit(user: string) {
    if (!this.questionnaire) throw new Error("Questionnaire not loaded");

    const response = await QuestionnaireApi.submitAnswers(user, {
      answers: this.questionnaire.answers,
    });
    if (!response.ok) throw new Error("Submission failed");
    return response.submissionDate;
  }
}
