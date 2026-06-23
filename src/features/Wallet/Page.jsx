import { useEffect, useState } from 'react';
import { Plus, Wallet, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getWallets } from '../../services/WalletService';
import Header from '../../components/Header';

export default function WalletPage() {
    const navigate = useNavigate();

    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const resp = await getWallets();
                setWallets(resp.list);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWallets();
    }, []);

    return (
        <div className="min-h-full p-4 text-white space-y-6">
            <Header back="/" title="Daftar Dompet"/>
            {/* Header */}
            <div className="flex items-center justify-end">

                <button
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-2xl
                        bg-green-600
                        active:scale-95
                    "
                    onClick={() => navigate('/wallet/add')}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Dompet
                </button>
            </div>

            {/* List */}
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
                                ID: {wallet.id}
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

        </div>
    );
}