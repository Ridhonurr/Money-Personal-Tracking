import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import WalletCard from './WalletCard';

import 'swiper/css';
import EmptyWalletCard from './EmptyWalletCard';

export default function WalletCarousel({ wallets }) {
    const [activeIndex, setActiveIndex] = useState(0);
    if (wallets.length === 0) {
        return <EmptyWalletCard />;
        }
    
    return (
        <div>
            <Swiper
                spaceBetween={16}
                slidesPerView={1.1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {wallets.map((wallet, index) => (
                    <SwiperSlide key={index}>
                        <WalletCard wallet={wallet} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination */}
            {wallets.length > 1 && (
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
            )}
        </div>
    );
}