import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function EmptyWalletCard() {
    const navigate = useNavigate();
    return (
        <button
            className="
                w-full
                h-52
                rounded-3xl
                border-2 border-dashed border-gray-700
                bg-[#141622]
                hover:border-green-500/50
                hover:bg-[#1a1c29]
                transition-all
                flex flex-col items-center justify-center
                gap-3
                active:scale-[0.98]
            "
            onClick={() => navigate("/wallet/add")}
        >
            <div
                className="
                    w-14 h-14
                    rounded-full
                    bg-green-500/10
                    flex items-center justify-center
                "
            >
                <Plus className="w-7 h-7 text-green-400" />
            </div>

            <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-200">
                    Tambah Dompet
                </div>

                <div className="text-xs text-gray-500">
                    Buat dompet baru untuk mulai bertransaksi
                </div>
            </div>
        </button>
    );
}