import {Guess, SpellGuess} from "@/type/Guess.ts";


export default function DisplayGuess({guess} : {guess: Guess[]}){
    return (
        guess.map((guess: Guess, index) => (
            <div
                key={guess.name}
                className={`mt-3 w-1/3 rounded border-2 border-gray-700 flex p-2 ${guess.isCorrect ? "bg-green-500" : "bg-red-700"}`}>
                <img src={`/characters/${guess?.name}.png`} alt=""
                     className="size-16 rounded"/>
                <div key={index} className="flex justify-center items-center">
                    <h1 className="font-semibold text-white ml-3">{guess?.name}</h1>
                </div>
            </div>
        ))
    )
}


export function DisplaySpellGuess({guess} : {guess: SpellGuess[]}){
    return (
        guess.map((guess: SpellGuess, index) => (
            <div
                key={guess.name}
                className={`mt-3 w-full rounded border-2 border-gray-700 flex p-2 ${guess.isCorrect ? 'bg-green-500' : 'bg-red-700'}`}>
                <img src={`${guess.img?.replace("\\G", "/")}`} alt=""
                     className="size-16 rounded scroll-auto"/>
                <div key={index} className="flex justify-center items-center">
                    <h1 className="font-semibold text-white ml-3 ">{guess?.name}</h1>
                </div>
            </div>
        ))
    )
}