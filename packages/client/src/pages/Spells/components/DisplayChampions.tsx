import {CommandItem, CommandSeparator} from "@/components/ui/command.tsx";

export default function DisplayChampions({handleGuess, championsList}: {handleGuess: Function, championsList}){

    return (
        championsList.map((character, index) => (
            <div key={index}>
            <CommandItem
                key={character}
                onSelect={handleGuess(character)}
            >
                <img src={`characters/${character}.png`} alt="" className="w-10 h-10 mr-3"/>
                <h1 className="font-semibold">{
                    character.charAt(0).toUpperCase() + character.slice(1)
                }</h1>
            </CommandItem>
            <CommandSeparator className="bg-dofus-brown" key={index}/>
            </div>
        ))
    )
}