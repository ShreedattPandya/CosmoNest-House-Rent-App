import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import axiosInstance from '@/utils/axios';
import { usePlaces } from '../../../hooks';

const HeroSection = () => {
    const allPlaces = usePlaces();
    const { setPlaces, setLoading } = allPlaces;

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchText(value);

        clearTimeout(searchTimeout);

        if (value.trim() !== '') {
            setLoading(true);
            const timeoutId = setTimeout(async () => {
                try {
                    const { data } = await axiosInstance.get(
                        `/places/search/${value.trim()}`,
                    );
                    setPlaces(data);
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setLoading(false);
                }
            }, 500);
            setSearchTimeout(timeoutId);
        } else {
            // If search is cleared, you might want to fetch all places or handle it accordingly
            // For now, let's keep it simple.
        }
    };

    const triggerScroll = () => {
        const housesSection = document.getElementById("available-houses");
        if (housesSection) {
            const y = housesSection.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-32 w-[100vw] relative left-1/2 -translate-x-1/2 border-b border-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Decorative Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
                <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute top-10 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-400/10 blur-[100px]" />
            </div>

            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center font-sans">

                <div className="mb-8 inline-flex cursor-default items-center rounded-full border border-gray-200 bg-white/80 px-5 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Over <span className="font-bold mx-1 text-primary">10k+</span> homes available to rent today
                </div>

                {/* Headline with integrated images (Trendy Inline Picture Pills) */}
                <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl lg:text-[5.5rem] lg:leading-[1.1]">
                    Find Your
                    <span className="mx-2 md:mx-4 inline-block h-12 w-24 md:h-16 md:w-32 lg:h-20 lg:w-40 overflow-hidden rounded-full align-middle border-[3px] md:border-4 border-white shadow-xl hover:-translate-y-1 transition-transform rotate-2">
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Luxury Home"
                            className="h-full w-full object-cover"
                        />
                    </span>
                    Perfect <br className="hidden md:block" />
                    <span className="relative inline-block">
                        <span className="relative z-10 text-primary bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">Nest</span>
                        <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary/20" />
                        </svg>
                    </span>
                    <span className="mx-2 md:mx-4 inline-block h-12 w-24 md:h-16 md:w-32 lg:h-20 lg:w-40 overflow-hidden rounded-full align-middle border-[3px] md:border-4 border-white shadow-xl hover:-translate-y-1 transition-transform -rotate-3">
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Modern Apartment"
                            className="h-full w-full object-cover"
                        />
                    </span>
                    Today
                </h1>

                <p className="mb-12 max-w-2xl text-lg text-gray-500 sm:text-xl leading-relaxed">
                    Discover cozy homes, modern apartments, and luxurious spaces tailored to your lifestyle. Renting made effortless and totally transparent.
                </p>

                {/* Unified Single Search Bar */}
                <div className="flex w-full max-w-2xl items-center rounded-full bg-white p-2 sm:p-2.5 shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl">
                    <div className="flex w-full items-center pl-4 sm:pl-6 focus-within:text-primary">
                        <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Where do you want to live?"
                            className="w-full bg-transparent px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        className="shrink-0 rounded-full bg-primary px-6 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                        onClick={triggerScroll}
                    >
                        Explore
                    </button>

                </div>

                {/* Trust Avatars */}
                <div className="mt-14 flex flex-col items-center gap-3">
                    <div className="flex -space-x-4">
                        <img src="https://i.pravatar.cc/100?img=11" alt="User" className="h-12 w-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-10 transition-transform hover:scale-110" />
                        <img src="https://i.pravatar.cc/100?img=22" alt="User" className="h-12 w-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-10 transition-transform hover:scale-110" />
                        <img src="https://i.pravatar.cc/100?img=33" alt="User" className="h-12 w-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-10 transition-transform hover:scale-110" />
                        <img src="https://i.pravatar.cc/100?img=44" alt="User" className="h-12 w-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-10 transition-transform hover:scale-110" />
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-gray-900 text-xs font-bold text-white shadow-sm hover:z-10 transition-transform hover:scale-110">
                            10k+
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-yellow-500 drop-shadow-sm mb-1">
                            <Star className="fill-current h-5 w-5" />
                            <Star className="fill-current h-5 w-5" />
                            <Star className="fill-current h-5 w-5" />
                            <Star className="fill-current h-5 w-5" />
                            <Star className="fill-current h-5 w-5" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500 cursor-default">Trusted by over 10,000 renters nationwide</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
