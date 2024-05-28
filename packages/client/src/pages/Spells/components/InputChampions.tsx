import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";


export default function InputChampions( {championList, handleGuess, isFound}: {championList: string[], handleGuess: (event: string) => void, isFound: boolean}){
    return (
        <Command className={`bg-dofus-gray  ${isFound ? 'hidden absolute' : 'block'}`}>
            <CommandInput placeholder="Type a command or search..."
                          className={"placeholder:text-white text-white"}/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {
                    championList.map((character) => (
                        <CommandItem
                            key={character}
                            onSelect={() => handleGuess(character)}
                            className={"text-white"}
                        >
                            <img src={`characters/${character}.png`} alt="" className="w-10 h-10 mr-3"/>
                            <h1 className="font-semibold">{
                                character.charAt(0).toUpperCase() + character.slice(1)
                            }</h1>
                        </CommandItem>
                    ))
                }
            </CommandList>
        </Command>
    )
}