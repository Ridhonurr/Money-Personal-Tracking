import { memo } from "react";

const WalletPagination = memo(({ wallets, activeIndex }) => (
    <div className="flex justify-center gap-2 mt-4">
        {wallets.map((_, index) => (
            <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                        ? 'w-6 bg-green-400'
                        : 'w-2 bg-gray-600'
                }`}
            />
        ))}
    </div>
));

export default WalletPagination;