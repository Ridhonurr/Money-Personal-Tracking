import { Wallet } from 'lucide-react';

export default function WalletCard({ wallet }) {
    return (
        <div className="
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-br from-green-800 via-[#1a1c29] to-[#0f111a]
            p-6
            border border-green-500/20
            shadow-2xl shadow-green-950/20
        ">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2 text-gray-400 text-xs tracking-wider uppercase font-semibold">
                    <Wallet className="w-4 h-4 text-green-400" />
                    {wallet.label}
                </div>
            </div>

            <div className="space-y-1">
                <div className="font-bold">
                    Saldo
                </div>

                <div className="text-3xl font-extrabold">
                    Rp {wallet.balance.toLocaleString('id-ID')}
                </div>
            </div>
        </div>
    );
}