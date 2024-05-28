import RandomSpell from "@/pages/Spells/components/RandomSpell.tsx";
import {useState} from "react";
import bcrypt from "bcryptjs";
import {useQuery} from "@tanstack/react-query";
import {Guess} from "@/type/Guess.ts";
import InputChampions from "@/pages/Spells/components/InputChampions.tsx";
import DisplayGuess from "@/pages/Spells/components/DisplayGuess.tsx";
import GuessSpell from "@/pages/Spells/components/GuessSpell.tsx";
import {getChampionList} from "@/utils/Champions.tsx";

export default function Spells() {
    const [isFound, setIsFound] = useState(false);
    const [blur, setBlur] = useState(0);
    const [guess, setGuess] = useState([] as Guess[]);
    const [championList, setChampionList] = useState(getChampionList);

    const hash = useQuery({
        queryKey: ['hash'], queryFn: async () =>
            await fetch('http://localhost:3000/salt').then((res) => {
                return res.json()
            })
    })

    async function handleGuess(event: string) {
        bcrypt.compare(event.toLowerCase().toString(), hash.data.hash).then((res) => {
            if (res) {
                setIsFound(true)
                setBlur(blur + 10)
                setGuess([{name: event, isCorrect: true}, ...guess])
            } else {
                setChampionList(championList.filter((champion) => champion !== event.toLowerCase().toString()))
                setBlur(blur + 1)
                setGuess([{name: event, isCorrect: false}, ...guess])
            }
        })
    }

    return (
        <>
            <div className="absolute bg-hero-pattern size-full -z-10 bg-cover brightness-[60%]"></div>
            <div className="size-full flex items-center flex-col overflow-x-scroll">
                <div
                    className="container h-[40rem] w-1/4 flex flex-col items-center min-w-96 bg-dofus-brown border-[6px] border-dofus-gray mt-14">
                    <h1 className="text-6xl translate-y-[-40px] font-black text-gray-200 tracking-wide italic">Dofudle</h1>
                    <RandomSpell blur={blur}/>
                    <div className="w-full mt-10">
                        <InputChampions championList={championList} handleGuess={handleGuess} isFound={isFound} />
                    </div>
                </div>
                <DisplayGuess guess={guess}/>
                {isFound && <GuessSpell champion={guess[0]} />}
            </div>
        </>
    );
}