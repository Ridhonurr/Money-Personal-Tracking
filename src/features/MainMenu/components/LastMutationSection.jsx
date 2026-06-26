import {
    ArrowDownLeft,
    ArrowUpRight,
    History
} from "lucide-react";
import { useNavigate } from "react-router";

export default function LastMutationSection({
    loadingMutation,
    mutations
}) {
    const navigate = useNavigate();

    return (
        <section className="space-y-4">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-sm">
                    <History className="w-4 h-4 text-green-400" />
                    Riwayat Mutasi
                </div>

                <button
                    className="text-xs text-green-400"
                    onClick={() => navigate("/mutation")}
                >
                    Lihat Semua
                </button>
            </div>

            {/* Content */}
            <div className="space-y-3">

                {loadingMutation && (
                    <div className="text-center text-gray-500 py-8">
                        Memuat...
                    </div>
                )}

                {!loadingMutation && mutations.length === 0 && (
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

                {!loadingMutation &&
                    mutations.map(item => (

                        <div
                            key={item.id}
                            className="
                                bg-[#141622]
                                border border-gray-800
                                rounded-2xl
                                p-4
                                space-y-3
                            "
                        >

                            <div className="flex items-start gap-3">

                                <div
                                    className={`
                                        w-10 h-10
                                        rounded-xl
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
                                            ? <ArrowDownLeft size={18}/>
                                            : <ArrowUpRight size={18}/>
                                    }
                                </div>

                                <div className="flex-1 min-w-0">

                                    <div className="flex justify-between gap-3">

                                        <div className="min-w-0">

                                            <div
                                                className="
                                                    font-medium
                                                    truncate
                                                "
                                            >
                                                {item.description}
                                            </div>

                                            <div className="flex items-center gap-2 mt-1">

                                                <span className="text-xs text-gray-500">
                                                    {item.category}
                                                </span>

                                                {item.wallet && (
                                                    <span
                                                        className="
                                                            px-2 py-1
                                                            rounded-full
                                                            bg-gray-800
                                                            text-[10px]
                                                            text-gray-300
                                                        "
                                                    >
                                                        {item.wallet}
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                        <div
                                            className={`
                                                text-right
                                                ${
                                                    item.type === "credit"
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }
                                            `}
                                        >

                                            <div className="font-bold text-sm">
                                                {item.type === "credit" ? "+" : "-"}
                                                Rp {item.nominal.toLocaleString("id-ID")}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {
                                                    new Date(item.timestamp).toLocaleString("id-ID", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div
                                className="
                                    flex justify-between
                                    text-xs
                                    bg-[#0f111a]
                                    rounded-xl
                                    px-3 py-2
                                "
                            >

                                <span className="text-gray-500">
                                    Saldo
                                </span>

                                <span className="text-gray-300">
                                    Rp {item.start_balance.toLocaleString("id-ID")}
                                    <span className="mx-2 text-gray-600">
                                        →
                                    </span>
                                    Rp {item.end_balance.toLocaleString("id-ID")}
                                </span>

                            </div>

                        </div>

                    ))
                }

            </div>

        </section>
    );
}