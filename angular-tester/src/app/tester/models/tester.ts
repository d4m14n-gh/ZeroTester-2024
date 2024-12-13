import { Question } from "./questions";

export class Tester {
    ///declartaions and constructor
    private currentQuestionNr: number = 0;
    private questions: Question[];
    private userAnswers: Set<number>[]; //todo polymorphical answers
    private isTestEnded: boolean = false;
    private isCurrentQuestionSubmited: boolean = false;
    private userAnswersCnt: number = 0;
    private userResult: number = 0;

    constructor(questions: Question[]) {
        if (questions.length == 0)
            throw new Error("Lista jest pusta");
        this.questions = questions;
        this.userAnswers = new Array(this.questions.length).fill(null).map(() => new Set());;
        console.log("Create tester. User Answers: "+this.userAnswers)
    }

    
    ///getters and setters
    getQuestions(): Question[] {
        return this.questions;
    }
    getQuestionsCount(): number {
        return this.questions.length;
    }
    getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionNr];
    }
    getCurrentQuestionNr(): number {
        return this.currentQuestionNr;
    }
    getResult(): number {
        return this.userResult;
    }
    getUserAnswersCnt(): number {
        return this.userAnswersCnt;
    }
    getCurrentQuestionUserAnswers(): Set<number> {
        return this.userAnswers[this.currentQuestionNr];
    }
    getIsCurrentQuestionSubmited(): boolean{
        return this.isCurrentQuestionSubmited;
    }
    getIsTestEnded(): boolean{
        return this.currentQuestionNr==this.getQuestionsCount()-1&&this.isCurrentQuestionSubmited;
    }


    ///functions
    isCurrentQuestionAnswerCorrect(answerNr: number): boolean{
        return this.getCurrentQuestion().correctAnswers.includes(answerNr);
    }
    switchCurrentQuestionUserAnswer(answerNr: number): void {
        if (this.isCurrentQuestionSubmited)
            return;
        let answers = this.userAnswers[this.currentQuestionNr];
        if (answers.has(answerNr))
            answers.delete(answerNr);
        else 
            answers.add(answerNr);
    }
    checkCurrentQuestionAnswers(): number {
        let result: number = 0;
        const correctAnswersCnt: number = this.getCurrentQuestion().correctAnswers.length;
        for (let answer of this.userAnswers[this.currentQuestionNr]) {
            if (this.isCurrentQuestionAnswerCorrect(answer))
                result++;
            else
            result--;
        }
        console.log("Result is: "+result);
        if (!correctAnswersCnt)
            return 1;
        return Math.max(result, 0)/correctAnswersCnt;
    }
    submitCurrentQuestion(): void {
        if (this.isCurrentQuestionSubmited)
            return;
        this.userResult += this.checkCurrentQuestionAnswers();
        this.userAnswersCnt ++;
        this.isCurrentQuestionSubmited = true;
    }
    goToNextQuestion(): boolean {
        if (this.isTestEnded || !this.isCurrentQuestionSubmited)
            return false;
        this.currentQuestionNr++;
        this.isCurrentQuestionSubmited = false;
        return true;
    }
}