import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Circle, Minus, Pencil, RectangleHorizontal, Share2, MessageSquare, Settings, Shapes, Type, X, Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

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
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareLinkRef = useRef<HTMLInputElement>(null);

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
    const router=useRouter();

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

    const getShareLink = () => {
        if (typeof window !== "undefined") {
            return `${window.location.origin}/canvas/${roomId}`;
        }
        return "";
    };

    const handleCopyLink = async () => {
        const link = getShareLink();
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            if (shareLinkRef.current) {
                shareLinkRef.current.select();
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
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

            {/* Share Dialog */}
            {showShareDialog && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowShareDialog(false)}
                >
                    <div 
                        className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-2xl max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Share Canvas</h2>
                            <button
                                onClick={() => setShowShareDialog(false)}
                                className="p-1.5 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <p className="text-neutral-400 text-sm mb-4">
                            Share this link to invite others to collaborate
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            <input
                                ref={shareLinkRef}
                                type="text"
                                readOnly
                                value={getShareLink()}
                                className="flex-1 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-600"
                            />
                            <button
                                onClick={handleCopyLink}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                    copied
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-violet-600 hover:bg-violet-700 text-white"
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowShareDialog(false)}
                            className="w-full px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-600/20">
                        <Shapes className="w-6 h-6" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">CollabBoard</span>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowShareDialog(true)}
                        className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                    onClick={()=>router.push('/currentlyworking')}
                    className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    <button 
                     onClick={()=>router.push('/currentlyworking')}
                    className="p-2.5 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 rounded-lg hover:shadow-md active:scale-95 duration-200">
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