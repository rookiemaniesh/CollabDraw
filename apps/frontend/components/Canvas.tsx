import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Circle, Minus, Pencil, RectangleHorizontal, Share2, MessageSquare, Settings, Shapes, Type } from "lucide-react";

export type Tool = "rect" | "circle" | "line" | "pencil" | "text";

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
    const [textInput, setTextInput] = useState<{ x: number; y: number; visible: boolean } | null>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        if (textInput?.visible && textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [textInput?.visible])

    const handleTextCommit = (value: string) => {
        if (!textInput || !value.trim()) {
            setTextInput(null);
            return;
        }

        const shape = {
            type: "text",
            x: textInput.x,
            y: textInput.y,
            value: value.trim(),
            fontSize: 16,
            color: "#ffffff"
        };

        // Add shape locally immediately for instant rendering (like other shapes)
        //@ts-ignore
        if (window.addShapeLocally) {
            //@ts-ignore
            window.addShapeLocally(shape);
        }

        // Also send via WebSocket for synchronization
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId
        }));

        setTextInput(null);
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (selectedTool === "text" && canvasRef.current && !textInput?.visible) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Clamp position to stay within canvas bounds
            const clampedX = Math.max(0, Math.min(x, canvasSize.width - 200));
            const clampedY = Math.max(0, Math.min(y, canvasSize.height - 40));
            setTextInput({ x: clampedX, y: clampedY, visible: true });
        }
    };
    return (
        <div className="relative h-full w-full overflow-hidden bg-neutral-950">
            <canvas 
                ref={canvasRef} 
                width={canvasSize.width} 
                height={canvasSize.height}
                onClick={handleCanvasClick}
            ></canvas>
            
            {textInput?.visible && (
                <input
                    ref={textInputRef}
                    type="text"
                    className="absolute   rounded px-2 py-1 text-white text-base outline-none backdrop-blur-sm"
                    style={{
                        left: `${textInput.x}px`,
                        top: `${textInput.y}px`,
                        zIndex: 1000,
                        minWidth: "200px"
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={(e) => handleTextCommit(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleTextCommit(e.currentTarget.value);
                        } else if (e.key === "Escape") {
                            setTextInput(null);
                        }
                    }}
                    placeholder="Enter Text"
                    autoFocus
                />
            )}

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
                {/* <IconButton
                    icon={<Pencil className="w-5 h-5" />}
                    isActive={selectedTool === "pencil"}
                    onClick={() => setSelectedTool("pencil")}
                /> */}
                <IconButton
                    icon={<Minus className="w-5 h-5 rotate-45" />}
                    isActive={selectedTool === "line"}
                    onClick={() => setSelectedTool("line")}
                />
                <IconButton
                    icon={<Type className="w-5 h-5" />}
                    isActive={selectedTool === "text"}
                    onClick={() => setSelectedTool("text")}
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