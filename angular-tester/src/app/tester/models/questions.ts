export class Question{
    content: string = "";
    answers: string[] = [];
    correctAnswer: number | undefined = 0;

    constructor(content: string, answers: string[], correct_answer: number | undefined) {
        this.content = content;
        this.answers = answers;
        this.correctAnswer = correct_answer;
    }

    static default(): Question{
        return new Question("", [], undefined);
    }
}