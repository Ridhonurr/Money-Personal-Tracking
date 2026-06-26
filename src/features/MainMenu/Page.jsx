import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, History, CreditCard, EllipsisVertical, Ellipsis } from 'lucide-react'; // Anggap saja kamu menggunakan lucide-react untuk icon
import { useNavigate } from 'react-router';
import WalletEntity from './entities/wallet_entity';
import WalletCardSkeleton from './components/WalletCardSkeleton';
import WalletCarousel from './components/WalletCarousel';
import { getWalletCards } from '../../services/WalletService';
import { GetLastMutation } from "../../services/MutationService";
import LastMutationSection from './components/LastMutationSection';


export default function MainMenuPage() {
    const [wallet, set_wallet] = useState([]);
    const [loading, set_loading] = useState(true);
    const [mutations, setMutations] = useState([]);
    const [loadingMutation, setLoadingMutation] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            set_loading(true);
            setLoadingMutation(true);

            const [walletResp, mutationResp] = await Promise.all([
                getWalletCards(),
                GetLastMutation()
            ]);

            set_wallet(
                walletResp.list.map(
                    item => new WalletEntity(item.name, item.balance)
                )
            );

            setMutations(mutationResp.list ?? []);
        } catch (err) {
            console.error(err);
        } finally {
            set_loading(false);
            setLoadingMutation(false);
        }
    };

    fetchData();

    }, []);

    const getGreeting = () => {
        const h = new Date().getHours();
        return h < 4 ? "Selamat malam"
            : h < 11 ? "Selamat pagi"
            : h < 15 ? "Selamat siang"
            : h < 18 ? "Selamat sore"
            : "Selamat malam";
    };


    return (
        <div className="min-h-full w-screen text-white overflow-y-auto font-sans selection:bg-green-500/30">

            <main className="max-w-md mx-auto px-4 py-6 space-y-3">
                <div className="flex justify-between">
                    <h1 className="font-bold">{getGreeting()}</h1>
                    <button onClick={() => navigate("/wallet")}>
                        <Ellipsis />    
                    </button>
                </div>
                {/* Wallet Card Section */}
                <section className="w-full">
                    {loading ? <WalletCardSkeleton />: <WalletCarousel wallets={wallet}/>}
                </section>

                {/* Quick Actions (Khas Dompet Kripto) */}
                <section className="grid grid-cols-2 gap-3 w-full">
                    <button className="flex flex-col items-center justify-center bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800/80 rounded-2xl py-3 transition-all group active:scale-95"
                    onClick={() => navigate("/mutation/add?type=credit")}>
                        <div className="p-3 bg-purple-500/10 rounded-full text-green-400 group-hover:bg-purple-500 group-hover:text-white transition-colors mb-2">
                            <ArrowDownLeft className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-300">Pemasukan</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800/80 rounded-2xl py-3 transition-all group active:scale-95"
                    onClick={() => navigate("/mutation/add?type=debit")}>
                        <div className="p-3 bg-pink-500/10 rounded-full text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors mb-2">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-300">Pengeluaran</span>
                    </button>
                    
                </section>

                {/* Transaction History Section */}
                <LastMutationSection mutations={mutations} loadingMutation={loadingMutation}/>
            </main>
        </div>
    );
}