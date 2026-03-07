import React from 'react';

const PlaceCardSkeleton = () => {
    return (
        <div className="m-4 flex w-full flex-col justify-self-center md:m-2 xl:m-0 animate-pulse">
            <div className="card w-full">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-200/80"></div>
                {/* Content Placeholders */}
                <div className="mt-3 flex flex-col gap-2">
                    <div className="h-5 w-4/5 rounded-md bg-gray-200/80"></div>
                    <div className="h-4 w-3/5 rounded-md bg-gray-200/80"></div>
                    <div className="mt-1 h-5 w-1/3 rounded-md bg-gray-200/80"></div>
                </div>
            </div>
        </div>
    );
};

export default PlaceCardSkeleton;
