export default function WalletCardSkeleton() {
    return (
        <div className="
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-br from-green-800 via-[#1a1c29] to-[#0f111a]
            p-6
            border border-green-500/20
            shadow-2xl shadow-green-950/20
            animate-pulse
        ">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="space-y-4">
                <div className="h-4 w-20 rounded bg-gray-700"></div>

                <div className="mt-8">
                    <div className="h-3 w-16 rounded bg-gray-700 mb-3"></div>
                    <div className="h-10 w-48 rounded bg-gray-700"></div>
                </div>
            </div>
        </div>
    );
}