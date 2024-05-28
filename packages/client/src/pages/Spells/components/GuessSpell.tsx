import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import {Guess} from "@/type/Guess.ts";
import RandomSpell from "@/pages/Spells/components/RandomSpell.tsx";
import RandomSpellSelect from "@/pages/Spells/components/RandomSpellSelect.tsx";

export default function GuessSpell({champion}: {champion: Guess}) {
    return (
        <AlertDialog defaultOpen={true}>
            <AlertDialogContent className={"bg-dofus-brown"}>
                <div className="flex items-center justify-center">
                    <img src={`/characters/${champion.name}.png`} alt="" className="size-10 rounded-lg"/>
                    <h1 className="font-semibold text-xl ml-5 text-white">Félicitations !  C'était un {champion.name.toUpperCase()}</h1>
                </div>
                <RandomSpell blur={10} />
                <RandomSpellSelect champion={champion}/>
            </AlertDialogContent>
        </AlertDialog>

    )
}