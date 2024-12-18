import { Question } from "./questions";

export class Tester {
    ///declartaions and constructor
    private currentQuestionNr: number = 0;
    private questions: Question[];
    private userAnswers: Set<number>[]; //todo polymorphical answers
    private userResults: number[];
    private isTestEnded: boolean = false;
    private isCurrentQuestionSubmited: boolean = false;
    private userAnswersCnt: number = 0;
    private userResult: number = 0;

    constructor(questions: Question[]) {
        if (questions.length == 0)
            throw new Error("Lista jest pusta");
        this.questions = questions;
        this.userAnswers = new Array(this.questions.length).fill(null).map(() => new Set());;
        this.userResults = new Array(this.questions.length).fill(0);
        console.log("Create tester");
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
    getResults(): number[] {
        return this.userResults;
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
    getUserAnswers(): Set<number>[]{
        return this.userAnswers;
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
        const result = this.checkCurrentQuestionAnswers()
        this.userResult += result;
        this.userResults[this.currentQuestionNr] = result;
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