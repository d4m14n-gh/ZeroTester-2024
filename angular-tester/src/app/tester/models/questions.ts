export class Question{
    content: string = "";
    answers: string[] = [];
    correctAnswers: number[] = []

    constructor(content: string, answers: string[], correct_answer?: number, correct_answers?: number[]) {
        this.content = content;
        this.answers = answers;
        if (correct_answers !== undefined)
            this.correctAnswers = correct_answers;
        else if (correct_answer !== undefined)
            this.correctAnswers = [correct_answer];
        else
            this.correctAnswers = [];
    }

    static default(): Question{
        return new Question("", [], undefined);
    }
}