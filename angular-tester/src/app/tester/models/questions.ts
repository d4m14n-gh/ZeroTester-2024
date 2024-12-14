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
    static fromJson(question: any): Question {
        let correct_answers: number[] | undefined = undefined;
        let correct_answer: number | undefined = undefined;
        if (Array.isArray(question["correct_answer"]))
            correct_answers = question["correct_answer"];
        else
            correct_answer = question["correct_answer"];
        return new Question(question["content"], question["answers"], correct_answer, correct_answers);
    }
    static quetionsFromJson(jsonContent: string): Question[]{
        let jsonParsed = JSON.parse(jsonContent);
        console.log(jsonParsed);
        return jsonParsed["questions"].map(Question.fromJson);
    }
}