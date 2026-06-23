import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    ArrowDownLeft,
    ArrowUpRight,
    Filter,
    Plus
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { GetMutation } from '../../services/MutationService';
import { IDT } from 'indonesia-datetime';

export default function MutationPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // data
    const [mutations, setMutations] = useState([]);
    const [totalData, setTotalData] = useState(0);

    // filter
    const [showFilter, setShowFilter] = useState(false);
    const [startDate, setStartDate] = useState(IDT.now().toFormat("yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(IDT.now().toFormat("yyyy-MM-dd"));
    const [limit, setLimit] = useState(10);

    // pagination
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const loadMutation = async () => {
        try {
            setLoading(true);

            const resp = await GetMutation({
                start: startDate,
                end: endDate,
                limit,
                page
            });

            setMutations(resp.list);
            setTotalPage(resp.total_page);
            setTotalData(resp.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMutation();
    }, [page]);


    return (
        <div className="min-h-screen text-white p-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    className="
                        p-3 rounded-2xl
                        bg-[#141622]
                        border border-gray-800
                    "
                    onClick={() => setShowFilter(true)}
                >
                    <Filter className="w-5 h-5" />
                </button>
                <div className="flex justify-end">
                <button
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-2xl
                        bg-green-600
                        active:scale-95
                    "
                    onClick={() => navigate("/mutation/add")}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Mutasi
                </button>
            </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {loading && (
                    <div className="text-center text-gray-500 py-8">
                        Memuat...
                    </div>
                )}
                 {!loading && mutations.length === 0 && (
                    <div
                        className="
                            rounded-3xl
                            border-2 border-dashed border-gray-700
                            p-8
                            text-center
                            text-gray-500
                        "
                    >
                        Tidak ada mutasi
                    </div>
                )}
                {!loading && mutations.map(item => (

                    <div
                        key={item.id}
                        className="
                            bg-[#141622]
                            border border-gray-800
                            rounded-3xl
                            p-4
                            flex gap-4
                        "
                    >

                        {/* Icon */}
                        <div
                            className={`
                                w-12 h-12
                                rounded-2xl
                                flex items-center justify-center
                                flex-shrink-0
                                ${
                                    item.type === "credit"
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-red-500/10 text-red-400"
                                }
                            `}
                        >
                            {
                                item.type === "credit"
                                    ? <ArrowDownLeft className="w-5 h-5"/>
                                    : <ArrowUpRight className="w-5 h-5"/>
                            }
                        </div>

                        <div className="flex-1 min-w-0">

                            <div className="flex justify-between gap-4">

                                <div className="min-w-0">
                                    <div className="font-semibold truncate">
                                        {item.description}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        {item.category}
                                    </div>
                                </div>

                                <div
                                    className={`
                                        font-bold whitespace-nowrap
                                        ${
                                            item.type === "credit"
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    `}
                                >
                                    {item.type === "credit" ? "+" : "-"}
                                    Rp {item.nominal.toLocaleString("id-ID")}
                                </div>

                            </div>

                            <div className="mt-3 text-xs text-gray-500 truncate">
                                Saldo:
                                {" "}
                                Rp {item.start_balance.toLocaleString("id-ID")}
                                {" → "}
                                Rp {item.end_balance.toLocaleString("id-ID")}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">

                <button
                    disabled={page === 1}
                    className="
                        px-4 py-3 rounded-2xl
                        bg-[#141622]
                        border border-gray-800
                        disabled:opacity-50
                    "
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    ← Prev
                </button>

                <div className="text-sm text-gray-400">
                    Page {page} / {totalPage}
                </div>

                <button
                    disabled={page === totalPage}
                    className="
                        px-4 py-3 rounded-2xl
                        bg-[#141622]
                        border border-gray-800
                        disabled:opacity-50
                    "
                    disabled={page >= totalPage}
                    onClick={() => setPage(page + 1)}
                >
                    Next →
                </button>

            </div>

            {/* Filter Bottom Sheet */}
            {
                showFilter && (

                    <div className="fixed inset-0 bg-black/60 z-50 flex items-end">

                        <div
                            className="
                                w-full
                                bg-[#141622]
                                rounded-t-3xl
                                p-6
                                space-y-4
                            "
                        >

                            <div className="text-lg font-bold">
                                Filter Mutasi
                            </div>

                            <div>

                                <label className="text-sm text-gray-400">
                                    Tanggal Mulai
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e)=>setStartDate(e.target.value)}
                                    className="
                                        w-full mt-1
                                        bg-[#0f111a]
                                        rounded-2xl
                                        p-4
                                    "
                                />

                            </div>

                            <div>

                                <label className="text-sm text-gray-400">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e)=>setEndDate(e.target.value)}
                                    className="
                                        w-full mt-1
                                        bg-[#0f111a]
                                        rounded-2xl
                                        p-4
                                    "
                                />

                            </div>

                            <div>

                                <label className="text-sm text-gray-400">
                                    Limit
                                </label>

                                <select
                                    value={limit}
                                    onChange={(e)=>setLimit(Number(e.target.value))}
                                    className="
                                        w-full mt-1
                                        bg-[#0f111a]
                                        rounded-2xl
                                        p-4
                                    "
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    className="
                                        p-4 rounded-2xl
                                        bg-gray-800
                                    "
                                    onClick={() => setShowFilter(false)}
                                >
                                    Batal
                                </button>

                                <button
                                    className="
                                        p-4 rounded-2xl
                                        bg-green-600
                                    "
                                    onClick={() => {
                                        setPage(1);
                                        setShowFilter(false);
                                        loadMutation();
                                    }}
                                >
                                    Terapkan
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
}