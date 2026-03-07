import React from 'react';
import { Shield, Zap, MapPin, Heart } from 'lucide-react';

const services = [
    {
        icon: Shield,
        title: "Verified Listings",
        description: "Every home in our nest is manually verified for quality and safety standards.",
        color: "text-emerald-500",
        bgColor: "bg-emerald-50"
    },
    {
        icon: Zap,
        title: "Instant Booking",
        description: "No more long waits. Book your dream stay within seconds with our fast-track process.",
        color: "text-amber-500",
        bgColor: "bg-amber-50"
    },
    {
        icon: MapPin,
        title: "Prime Locations",
        description: "From city centers to hidden gems, find the perfect spot in your favorite neighborhood.",
        color: "text-blue-500",
        bgColor: "bg-blue-50"
    },
    {
        icon: Heart,
        title: "Tailored Comfort",
        description: "We match you with homes that fit your specific lifestyle and preferences.",
        color: "text-rose-500",
        bgColor: "bg-rose-50"
    }
];

const QuickServices = () => {
    return (
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Why Choose <span className="text-primary">CosmoNest?</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Experience a new standard of home renting with features designed for your peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon className={`h-7 w-7 ${service.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="mt-6 flex items-center text-primary font-semibold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 translate-x-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        </section>
    );
};

export default QuickServices;
