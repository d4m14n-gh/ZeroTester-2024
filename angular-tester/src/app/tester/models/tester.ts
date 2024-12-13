import { Question } from "../models/questions";

export class tester {
    //declartaions
    private currentQuestionNr: number = 0;
    //private userAnswers: boolean[] = [];
    private questions?: Question[];
    private isTestEnded: boolean = false;
    private isCurrentQuestionSubmited: boolean = false;
    private correctAnswersCnt: number = 0;

    //getters and setters
    getQuestionsCount(): number {
        if (!this.questions)
            return 0;
        return this.questions.length;
    }


    //functions
    submitCurrentQuestion() {
        //todo: answers chcecking
    }
    goToNextQuestion(): boolean {
        if (this.isTestEnded || !this.isCurrentQuestionSubmited)
            return false;
        this.currentQuestionNr+=1;
        return true;
    }
}