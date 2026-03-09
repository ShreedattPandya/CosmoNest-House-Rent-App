import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

import ProfilePage from './ProfilePage';
import { useAuth } from '../../hooks';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };



  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (auth.user) {
    return <ProfilePage />;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-around p-4 md:p-8 pt-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Login to your account to continue nesting</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] transition-all">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleFormData}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleFormData}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <button className="w-full bg-primary py-4 rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all mt-4">
              Login
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center gap-4">
            <div className="h-[1px] grow bg-gray-100"></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">or continue with</p>
            <div className="h-[1px] grow bg-gray-100"></div>
          </div>

          {/* Google login button placeholder or existing integration */}
          <div className="flex justify-center mb-6">
            {/* Add Google Login integration here if needed, matching the register page */}
          </div>

          <div className="text-center text-gray-500 font-medium">
            Don't have an account yet?{' '}
            <Link className="text-primary font-bold hover:underline" to={'/register'}>
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
