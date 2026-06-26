import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import WalletCard from './WalletCard';

import 'swiper/css';
import EmptyWalletCard from './EmptyWalletCard';
import WalletPagination from './WalletCardPagination';

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
                {wallets.map(wallet => (
                    <SwiperSlide key={wallet.id}>
                        <WalletCard wallet={wallet} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination */}
            {wallets.length > 1 && (
                <WalletPagination wallets={wallets} activeIndex={activeIndex} />
            )}
        </div>
    );
}