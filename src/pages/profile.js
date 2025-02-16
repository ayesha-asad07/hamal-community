import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../utils/auth';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:1337/api'; // Replace with your backend URL

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  // Fetch profile details
  useEffect(() => {
    /** const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token-based auth if required
          },
        }); 
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile details', error);
      }
    };**/

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-extrabold text-pink-700 mb-8">Your Profile</h1>
      {profile ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar || '/default-avatar.png'} // Placeholder image if no avatar
              alt="Avatar"
              className="w-24 h-24 rounded-full shadow"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Bio:</span>
              <p className="text-gray-800">{profile.bio || 'No bio available'}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Joined:</span>
              <p className="text-gray-800">{new Date(profile.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Loading profile details...</p>
      )}
    </div>
  );
};

export default ProfilePage;
