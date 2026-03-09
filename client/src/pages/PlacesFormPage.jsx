import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === '') {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Upload at least 5 photos!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1) {
      toast.error('At least one guests is required!');
      return false;
    } else if (maxGuests > 10) {
      toast.error("Max. guests can't be greater than 10");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    // If the input is not a checkbox, update 'formData' directly
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    // If type is checkbox (perks)
    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];

      // Check if the perk is already in perks array
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }

      // update photos state separately
      setAddedPhotos([...place.photos]);

      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    // console.log(isValidPlaceData());
    const placeData = { ...formData, addedPhotos };

    // Make API call only if formData is valid
    if (formDataIsValid) {
      if (id) {
        // update existing place
        const { data } = await axiosInstance.put('/places/update-place', {
          id,
          ...placeData,
        });
      } else {
        // new place
        const { data } = await axiosInstance.post(
          '/places/add-places',
          placeData,
        );
      }
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <AccountNav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            {id ? 'Update Property' : 'List New Property'}
          </h1>
          <p className="text-gray-500">Share your space with the world and start earning today.</p>
        </div>

        <form onSubmit={savePlace} className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] space-y-10">
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Basic Information</h3>
              <p className="text-sm text-gray-500">Provide a catchy title and clear address for your property.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleFormData}
                  placeholder="e.g., Luxury Waterfront Villa with Private Pool"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleFormData}
                  placeholder="Detailed address of the location"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Visuals & Details</h3>
              <p className="text-sm text-gray-500">Upload high-quality photos and describe what makes your place unique.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 ml-1">Property Photos (Min. 5)</label>
                <PhotosUploader
                  addedPhotos={addedPhotos}
                  setAddedPhotos={setAddedPhotos}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Property Description</label>
                <textarea
                  value={description}
                  name="description"
                  onChange={handleFormData}
                  placeholder="Tell potential guests about the atmosphere, the neighborhood, and the amenities..."
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none h-40 text-gray-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Amenities & Logistics</h3>
              <p className="text-sm text-gray-500">Let guests know what's included and any house rules.</p>
            </div>

            <div className="space-y-6">
              <Perks selected={perks} handleFormData={handleFormData} />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Extra Information / House Rules</label>
                <textarea
                  value={extraInfo}
                  name="extraInfo"
                  onChange={handleFormData}
                  placeholder="e.g. No smoking, quiet hours, pet policies..."
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none h-32 text-gray-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Guests & Pricing</h3>
              <p className="text-sm text-gray-500">Set the capacity and your nightly rate.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Max Guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={maxGuests}
                  onChange={handleFormData}
                  placeholder="e.g. 4"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Price Per Night (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleFormData}
                  placeholder="e.g. 1500"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-gray-800 font-bold text-primary"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 text-center border-t border-gray-100">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 px-16 text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95">
              {id ? 'Update Listing' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormPage;
