import { Pencil, Wallet } from "lucide-react";
import { useNavigate } from "react-router";

export default function WalletListSection({loading, wallets}){
    const navigate = useNavigate();
    return (
        <div className="space-y-3">
                {loading && (
                    <div className="text-gray-500">
                        Memuat...
                    </div>
                )}

                {!loading && wallets.map(wallet => (
                    <div
                        key={wallet.id}
                        className="
                            flex items-center gap-4
                            rounded-3xl
                            bg-[#141622]
                            border border-gray-800
                            p-4
                            active:scale-[0.98]
                        "
                        onClick={() => navigate(`/wallet/${wallet.id}`)}
                    >
                        <div className="
                            w-12 h-12
                            rounded-2xl
                            bg-green-500/10
                            flex items-center justify-center
                        ">
                            <Wallet className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex-1">
                            <div className="font-semibold">
                                {wallet.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                Saldo: {wallet.balance.toLocaleString("id-ID")}
                            </div>
                        </div>
                        <Pencil className="w-5 h-5" />
                    </div>
                ))}

                {!loading && wallets.length === 0 && (
                    <div className="
                        rounded-3xl
                        border-2 border-dashed border-gray-700
                        p-8
                        text-center
                        text-gray-500
                    ">
                        Belum ada dompet
                    </div>
                )}
            </div>
    );
}