import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

export default function RandomSpell({ blur }: { blur: number }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['daily'],
        queryFn: () => fetch('http://localhost:3000/daily').then((res) => res.json()),
    });

    useEffect(() => {
        if (!data || !canvasRef.current) return;
        const img = new Image();
        img.src = data.daily.spell.img;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        img.onload = function () {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                ctx.filter = `blur(${8 - blur}px)`;
                ctx.drawImage(img, 5, 5, 65, 65);
            }
        };
    }, [data, blur]);
    return (
        <div className="bg-gray-300 rounded-lg flex h-40 w-full justify-center items-center">
            <div className="w-[70px] mt-20">
                {!isLoading && <canvas id="modal" ref={canvasRef} className="size-fit" />}
            </div>
        </div>
    );
}
