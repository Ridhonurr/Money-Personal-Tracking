import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { getWallets } from "../../services/WalletService";
import { AddMutation, GetCategory } from "../../services/MutationService";
import { useNavigate, useSearchParams } from "react-router";

export default function AddMutationPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [walletId, setWalletId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [type, setType] = useState(searchParams.get("type") ?? "debit");
    const [nominal, setNominal] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [wallets, setWallets] = useState([]);

    const [categories, setCategory] = useState([{id: "new", name: "Lainnya"}]);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            const [walletResp, categoryResp] = await Promise.all([
                getWallets(),
                GetCategory()
            ]);

            const list = [
                ...categoryResp.list,
                {
                    id: "new",
                    name: "Lainnya"
                }
            ];

            setCategory(list);
            setWallets(walletResp.list);
            setLoading(false);
        }
        fetchData();
    },[]);

    const handleSubmit = async () => {
        try {
            if (!walletId) {
                alert("Pilih dompet");
                return;
            }

            if (!categoryId) {
                alert("Pilih kategori");
                return;
            }

            if (categoryId === "new" && !customCategory.trim()) {
                alert("Nama kategori wajib diisi");
                return;
            }

            if (!nominal || Number(nominal) <= 0) {
                alert("Nominal tidak valid");
                return;
            }

            setLoading(true);

            const is_new = categoryId === "new";

            await AddMutation({
                wallet_id: walletId,
                type,
                nominal: Number(nominal),
                description: description || "-",

                category_id: is_new
                    ? "-"
                    : categoryId,

                category_name: is_new
                    ? customCategory.trim()
                    : "-",

                is_new
            });

            alert("Mutasi berhasil ditambahkan");
            navigate("/mutation");
        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan mutasi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full text-white p-4 space-y-6">
            <Header
                back="/mutation"
                title="Tambah Mutasi"
            />

            <div className="space-y-4">

                {/* Wallet */}
                <div>
                    <label className="text-sm text-gray-400">
                        Dompet
                    </label>

                    <select
                        value={walletId}
                        onChange={e => setWalletId(e.target.value)}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                    >
                        <option value="">
                            Pilih Dompet
                        </option>

                        {wallets.map(wallet => (
                            <option
                                key={wallet.id}
                                value={wallet.id}
                            >
                                {wallet.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="text-sm text-gray-400">
                        Kategori
                    </label>

                    <select
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                    >
                        <option value="">
                            Pilih Kategori
                        </option>

                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {categoryId === "new" && (
                    <div>
                        <label className="text-sm text-gray-400">
                            Nama Kategori Baru
                        </label>

                        <input
                            value={customCategory}
                            onChange={e => setCustomCategory(e.target.value)}
                            className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                            placeholder="Masukkan nama kategori"
                        />
                    </div>
                )}

                {/* Type */}
                <div>
                    <label className="text-sm text-gray-400">
                        Jenis Mutasi
                    </label>

                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                    >
                        <option value="debit">
                            Pengeluaran
                        </option>

                        <option value="credit">
                            Pemasukkan
                        </option>
                    </select>
                </div>

                {/* Nominal */}
                <div>
                    <label className="text-sm text-gray-400">
                        Nominal
                    </label>

                    <input
                        type="number"
                        value={nominal}
                        onChange={e => setNominal(e.target.value)}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        placeholder="0"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm text-gray-400">
                        Keterangan
                    </label>

                    <textarea
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full mt-1 rounded-2xl bg-[#141622] p-4 outline-none"
                        placeholder="Masukkan keterangan"
                    />
                </div>

                <button
                    className="
                        w-full
                        rounded-2xl
                        bg-green-600
                        p-4
                        font-semibold
                    "
                    onClick={handleSubmit}
                >
                    Simpan Mutasi
                </button>

            </div>
        </div>
    );
}