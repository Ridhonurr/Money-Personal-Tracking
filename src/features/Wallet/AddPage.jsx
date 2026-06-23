import { useState, useEffect } from 'react';
import { addWallet, getTypeWallet } from '../../services/WalletService';
import Header from '../../components/Header';
import { useNavigate } from 'react-router';

export default function AddWalletPage() {
    const navigate = useNavigate();
    const [type_wallet_list, setTypeList] = useState([{
        id: "new",
        name: "Lainnya"
    }]);

    const [label, setLabel] = useState('');
    const [balance, setBalance] = useState('');
    const [type_wallet, setTypeWallet] = useState('');
    const [customType, setCustomType] = useState('');
    const [description, setDescription] = useState('');
    const [showOnCard, setShowOnCard] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchType = async ()=>{
            try {
                const resp = await getTypeWallet();
                
                const list = [
                    ...resp.list,
                    {
                        id: "new",
                        name: "Lainnya"
                    }
                ];

                setTypeList(list);

                if (list.length > 0) {
                    setTypeWallet(list[0].id);
                }
            } catch (err){
                console.error(err);
            }
        }
        fetchType();
    },[]);

    const handleSubmit = async () => {
        if (!label.trim()) {
            alert("Nama dompet wajib diisi");
            return;
        }

        if (type_wallet === "new" && !customType.trim()) {
            alert("Nama tipe dompet wajib diisi");
            return;
        }
        try {
            setLoading(true);
            const is_new = type_wallet === "new";

            await addWallet({
                name: label,
                balance,
                description,
                type_wallet: is_new
                    ? customType.trim() // nama tipe baru
                    : type_wallet,      // id tipe yang dipilih

                is_new,
                is_showing: showOnCard
            });
            alert("Dompet berhasil ditambahkan");
            navigate("/");

        } catch (err) {
            alert("Gagal menambahkan dompet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full text-white p-4 space-y-6">
            <Header back="/wallet" title="Tambah Dompet"/>
            {/* Preview */}
            <div className="rounded-3xl bg-gradient-to-br from-green-800 via-[#1a1c29] to-[#0f111a] p-6 border border-green-500/20">
                <div className="text-xs text-gray-400 uppercase">
                    {
                        type_wallet === "new"
                            ? customType
                            : type_wallet_list.find(item => item.id === type_wallet)?.name
                    }
                </div>

                <div className="mt-8">
                    <div className="text-sm text-gray-300">
                        {label || 'Nama Dompet'}
                    </div>

                    <div className="text-3xl font-bold">
                        Rp {(balance || 0).toLocaleString('id-ID')}
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-4">

                <div>
                    <label className="text-sm text-gray-400">
                        Nama Dompet
                    </label>

                    <input
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">
                        Saldo Awal
                    </label>

                    <input
                        type="number"
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        value={balance}
                        onChange={e => setBalance(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">
                        Tipe Dompet
                    </label>

                    <select
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        value={type_wallet}
                        onChange={e => setTypeWallet(e.target.value)}
                    >
                        {type_wallet_list.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {type_wallet === 'new' && (
                    <div>
                        <label className="text-sm text-gray-400">
                            Nama Tipe Dompet
                        </label>

                        <input
                            className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                            value={customType}
                            onChange={e => setCustomType(e.target.value)}
                        />
                    </div>
                )}

                <div>
                    <label className="text-sm text-gray-400">
                        Keterangan
                    </label>

                    <textarea
                        rows={3}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <label className="flex items-center gap-3 rounded-2xl bg-[#141622] p-4">
                    <input
                        type="checkbox"
                        checked={showOnCard}
                        onChange={e => setShowOnCard(e.target.checked)}
                    />

                    <span>Tampilkan pada kartu utama</span>
                </label>

                <button
                    disabled={loading}
                    className="w-full rounded-2xl bg-green-600 p-4 font-semibold disabled:opacity-50"
                    onClick={handleSubmit}
                >
                    {loading ? "Menyimpan..." : "Simpan Dompet"}
                </button>

            </div>
        </div>
    );
}