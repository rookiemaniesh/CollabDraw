import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Circle, Minus, Pencil, RectangleHorizontal, Share2, MessageSquare, Settings, Shapes } from "lucide-react";

export type Tool = "rect" | "circle" | "line" | "pencil";

export default function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket,
    roomId: string
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("rect");
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setCanvasSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        let cleanupFunc: (() => void) | undefined;

        async function init() {
            if (canvasRef.current) {
                // initDraw returns a cleanup function (wrapped in a Promise)
                cleanupFunc = await initDraw(canvasRef.current, roomId, socket);
            }
        }
        init();

        return () => {
            if (cleanupFunc) cleanupFunc();
        }
    }, [canvasRef, roomId, socket, canvasSize]); // Re-run when size changes to re-init context

    useEffect(()=>{
        //@ts-ignore
        window.selectedTool=selectedTool
    },[selectedTool])
    return (
        <div className="relative h-full w-full overflow-hidden bg-neutral-950">
            <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}></canvas>

            <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-600/20">
                        <Shapes className="w-6 h-6" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">CollabDraw</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 shadow-xl backdrop-blur-md">
                <IconButton
                    icon={<RectangleHorizontal className="w-5 h-5" />}
                    isActive={selectedTool === "rect"}
                    onClick={() => setSelectedTool("rect")}
                />
                <IconButton
                    icon={<Circle className="w-5 h-5" />}
                    isActive={selectedTool === "circle"}
                    onClick={() => setSelectedTool("circle")}
                />
                <IconButton
                    icon={<Pencil className="w-5 h-5" />}
                    isActive={selectedTool === "pencil"}
                    onClick={() => setSelectedTool("pencil")}
                />
                <IconButton
                    icon={<Minus className="w-5 h-5 rotate-45" />}
                    isActive={selectedTool === "line"}
                    onClick={() => setSelectedTool("line")}
                />
            </div>
        </div>
    );
}

function IconButton({ icon, onClick, isActive }: { icon: React.ReactNode, onClick: () => void, isActive: boolean }) {
    return (
        <button
            className={`p-3 rounded-lg transition-all duration-200 ${isActive
                ? "bg-pink-600 text-white shadow-lg shadow-violet-600/20 scale-105"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}