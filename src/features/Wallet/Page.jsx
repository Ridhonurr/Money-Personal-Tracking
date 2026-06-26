import { useEffect, useState } from 'react';
import { Plus, Wallet, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getWallets } from '../../services/WalletService';
import Header from '../../components/Header';
import WalletListSection from './components/WalletListSection';

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
            <WalletListSection wallets={wallets} loading={loading}/>

        </div>
    );
}