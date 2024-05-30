

export type Guess = {
    name: string;
    isCorrect: boolean;
}
export type SpellGuess = Guess & {
    img: string | undefined;
}