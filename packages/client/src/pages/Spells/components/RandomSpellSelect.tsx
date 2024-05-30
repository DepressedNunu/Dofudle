import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Guess, SpellGuess} from "@/type/Guess.ts";
import {useEffect, useState} from "react";
import {getChampionSpells} from "@/utils/Champions.tsx";
import {Spell} from "@/type/Spell.ts";
import {DisplaySpellGuess} from "@/pages/Spells/components/DisplayGuess.tsx";
import bcrypt from "bcryptjs";
import {useQuery} from "@tanstack/react-query";

export default function RandomSpellSelect({champion}: { champion: Guess }) {
    const [spell, setSpell] = useState<Spell[]>([]); // Initialize with an empty array
    const [guess, setGuess] = useState([] as SpellGuess[]); // Initialize with an empty array

    const SpellHash = useQuery({
        queryKey: ['SpellHash'], queryFn: async () =>
            await fetch('http://localhost:3000/daily').then((res) => {
                return res.json()
            })
    })

    useEffect(() => {
        const spell = getChampionSpells(champion.name)
        setSpell(spell);
    }, [champion]);

    async function handleGuess(event: string) {
        console.log(event.toString())
        if (await bcrypt.compare(event.toString(), SpellHash.data.daily.spellHash)) {
            setGuess([{
                name: event,
                img: spell.find((spell) => spell.name === event)?.img,
                isCorrect: true
            }, ...guess])
            setSpell(spell.filter((spell) => spell.name !== event))
            return;
        }
        setGuess([{
            name: event,
            img: spell.find((spell) => spell.name === event)?.img,
            isCorrect: false
        }, ...guess])
        setSpell(spell.filter((spell) => spell.name !== event))
    }

    return (
        <>
            <div className="flex justify-center items-center mt-5 h-full">
                <div className="flex justify-center items-center mt-5 w-full h-full mb-14">
                    {guess[0]?.isCorrect && <div className={`bg-dofus-gray border-4 text-white text-xl p-4 rounded-lg`}>
                        <p className={"flex gap-2 align-middle items-center"}>Félicitation! Le sort est <p
                            className={"border w-fit rounded-xl p-2"}>{SpellHash.data.daily.spell.name}</p></p>
                        <p>Prochain Dofudle
                            dans {(23 - new Date().getHours()) + " : " + (59 - new Date().getMinutes())} </p>
                    </div>}
                    {spell &&
                    spell.length ? (
                        <>
                            <Command
                                key={'command'}
                                className={`bg-dofus-gray border text-white ${guess[0]?.isCorrect ? "hidden" : "block"}`}
                            >
                                <CommandInput placeholder="Find the Spell..."
                                              className={"text-white placeholder:text-white"}/>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandList>
                                    {spell.map((spell) => {
                                        {
                                            return <CommandItem
                                                onSelect={() => handleGuess(spell.name)}
                                                key={spell.name}>{spell.name}</CommandItem>
                                        }
                                    })}
                                </CommandList>
                            </Command>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
            <div
                className="h-56 overflow-y-scroll w-full flex flex-col bg-dofus-brown border-gray-700 rounded-lg"
            >
                <DisplaySpellGuess guess={guess}/>
            </div>
        </>
    );
}
