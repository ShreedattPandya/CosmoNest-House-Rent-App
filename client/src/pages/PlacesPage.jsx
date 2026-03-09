import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import InfoCard from '@/components/ui/InfoCard';
import Spinner from '@/components/ui/Spinner';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get('places/user-places');
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <AccountNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">My Properties</h1>
            <p className="text-gray-500">Manage and view all your listed homes in one place</p>
          </div>

          <Link
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 px-8 text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Property
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {places.length > 0 ? (
            places.map((place) => <InfoCard place={place} key={place._id} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-2xl mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No properties listed yet</h3>
              <p className="text-gray-500 mb-8 max-w-sm text-center">Ready to become a host? Start by adding your first property to CosmoNest.</p>
              <Link to="/account/places/new" className="text-primary font-bold hover:underline">Click here to get started</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
