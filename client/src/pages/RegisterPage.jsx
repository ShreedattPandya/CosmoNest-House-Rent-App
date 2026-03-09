import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.register(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-around p-4 md:p-8 pt-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Join CosmoNest</h1>
          <p className="text-gray-500">Create an account to start your journey</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] transition-all">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleFormData}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                required
              />
            </div>

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
              Create Account
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center gap-4">
            <div className="h-[1px] grow bg-gray-100"></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">or join with</p>
            <div className="h-[1px] grow bg-gray-100"></div>
          </div>

          {/* Google login button */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              shape="pill"
              theme="outline"
              text="signup_with"
              width="100%"
            />
          </div>

          <div className="text-center text-gray-500 font-medium">
            Already a member?{' '}
            <Link className="text-primary font-bold hover:underline" to={'/login'}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
