import { usePlaces } from '../../hooks';
import PlaceCard from '@/components/ui/PlaceCard';
import HeroSection from '@/components/ui/HeroSection';
import PlaceCardSkeleton from '@/components/ui/PlaceCardSkeleton';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <HeroSection />

      <div id="available-houses" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          Available <span className="text-primary">Houses</span>
        </h2>
        <p className="mb-12 text-center text-gray-500">
          Discover places tailored for you and book your ideal stay.
        </p>

        {loading ? (
          <div className="relative w-full">
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative min-h-[40vh] w-full">
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
              {places.length > 0 ? (
                places.map((place) => <PlaceCard place={place} key={place._id} />)
              ) : (
                <div className="col-span-full flex w-full flex-col items-center justify-center rounded-2xl bg-gray-50 py-20 text-center ring-1 ring-gray-200">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">No properties available</h1>
                  <p className="mb-8 text-base text-gray-500">
                    Sorry, we couldn&#39;t find any rental places at the moment. Please check back later.
                  </p>
                  <a href="/">
                    <button className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      Refresh Search
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
