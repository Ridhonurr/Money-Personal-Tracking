import { ArrowLeft, ChevronLast, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Header({
    back,
    title
}){
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between mb-6">
            <button
                    className="
                        p-3 rounded-2xl
                        bg-[#141622]
                        border border-gray-800
                    "
                    onClick={() => navigate(back)}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="font-bold text-lg">
                    {title}
                </div>
            <div>
                
            </div>
        </div>
    );
}