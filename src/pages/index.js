import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi backend URL

const HomePage = () => {
  const [channels, setChannels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${API_URL}/channels`)
      .then((response) => setChannels(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-extrabold text-pink-700 mb-6 animate-fade-in">
        Welcome to the Hamal Community
      </h1>
      <div className="space-x-4 mb-8">
        {!isAuthenticated() && (
          <Link
            href="/login"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition-all"
          >
            Login
          </Link>
        )}
        {!isAuthenticated() && (
          <Link
            href="/signup"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition-all"
          >
            Sign Up
          </Link>
        )}
        {isAuthenticated() && (
          <Link
            href="/profile"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-all"
          >
            Profile
          </Link>
        )}
        {isAuthenticated() && (
          <button
            onClick={() => router.push('/create-post')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Create Post
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Available Channels
      </h2>
      <ul className="w-full max-w-lg space-y-4">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/channels/${channel.id}`}
              className="text-lg font-bold text-pink-700 hover:underline"
            >
              {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
