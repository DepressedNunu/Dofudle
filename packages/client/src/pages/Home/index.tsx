import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";


export default function Home() {
    return (
        <>
            <div className="absolute bg-hero-pattern size-full -z-10 bg-cover brightness-[60%]"></div>
            <div className="size-full flex items-center">
                <div className="container h-3/4 w-1/4 rounded-md flex flex-col items-center text-gray-300 bg-dofus-brown border-4 border-dofus-gray">
                    <h1 className="text-6xl translate-y-[-40px] font-black italic">Dofudle</h1>
                    <div className="w-full flex flex-col items-center gap-10">
                        <Button asChild className="w-4/5 h-14 bg-dofus-gray border border-gray-400 hover:bg-dofus-light-gray hover:border-dofus-gray hover:translate-y-[-2px] duration-200 transition">
                            <Link to="/spells">Classic</Link>
                        </Button>
                        <Button asChild className="w-4/5 h-14 bg-dofus-gray border border-gray-400 hover:bg-dofus-light-gray hover:border-dofus-gray hover:translate-y-[-2px] duration-200 transition">
                            <Link to="/spells">Spells</Link>
                        </Button>
                        <Button asChild className="w-4/5 h-14 bg-dofus-gray border border-gray-400 hover:bg-dofus-gray">
                            <Link to="/">More coming soon..</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}