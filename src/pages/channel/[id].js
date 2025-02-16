import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Replace with your backend URL

const ChannelPage = () => {
  const [channel, setChannel] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/channels/${id}`)
        .then((response) => setChannel(response.data))
        .catch((error) => console.error('Failed to fetch channel details', error));
    }
  }, [id]);

  if (!channel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading channel details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-6">
          {channel.name}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{channel.description}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Posts in {channel.name}</h2>
          {/* Add placeholder or real posts here */}
          <ul className="space-y-4 mt-4">
            {channel.posts && channel.posts.length > 0 ? (
              channel.posts.map((post) => (
                <li
                  key={post.id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-shadow"
                >
                  <h3 className="text-xl font-bold text-pink-700">{post.title}</h3>
                  <p className="text-gray-700">{post.excerpt || 'No excerpt available'}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No posts available in this channel yet.</p>
            )}
          </ul>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-8 bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition-all"
        >
          Back to Channels
        </button>
      </div>
    </div>
  );
};

export default ChannelPage;
