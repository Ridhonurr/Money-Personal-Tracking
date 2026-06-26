export default function ReportPage() {
    const dummyReport = {
        total_balance: 8500000,
        today_debit: 275000,
        today_credit: 1250000,
        wallets: [
            {
                name: "Cash",
                balance: 1000000
            },
            {
                name: "BCA",
                balance: 4500000
            },
            {
                name: "SeaBank",
                balance: 3000000
            }
        ]
    };

    return (
        <div className="min-h-full p-4 text-white space-y-6">

            {/* Summary */}
            <div className="space-y-3">

                <div className="bg-[#141622] rounded-3xl p-5 border border-gray-800">
                    <div className="text-sm text-gray-400">
                        Total Saldo
                    </div>

                    <div className="text-3xl font-bold text-green-400 mt-2">
                        Rp {dummyReport.total_balance.toLocaleString("id-ID")}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div className="bg-[#141622] rounded-3xl p-4 border border-gray-800">
                        <div className="text-xs text-gray-400">
                            Pengeluaran Hari Ini
                        </div>

                        <div className="mt-2 text-red-400 font-bold">
                            Rp {dummyReport.today_debit.toLocaleString("id-ID")}
                        </div>
                    </div>

                    <div className="bg-[#141622] rounded-3xl p-4 border border-gray-800">
                        <div className="text-xs text-gray-400">
                            Pemasukan Hari Ini
                        </div>

                        <div className="mt-2 text-green-400 font-bold">
                            Rp {dummyReport.today_credit.toLocaleString("id-ID")}
                        </div>
                    </div>

                </div>

            </div>

            {/* Wallet Detail */}
            <div className="bg-[#141622] rounded-3xl border border-gray-800 p-5 space-y-3">

                <div className="font-semibold">
                    Detail Wallet
                </div>

                {dummyReport.wallets.map(wallet => (
                    <div
                        key={wallet.name}
                        className="
                            flex justify-between
                            items-center
                            rounded-2xl
                            bg-[#1c1e2d]
                            p-4
                        "
                    >
                        <div className="font-medium">
                            {wallet.name}
                        </div>

                        <div className="font-bold text-green-400">
                            Rp {wallet.balance.toLocaleString("id-ID")}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}