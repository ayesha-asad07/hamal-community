import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://hamal-backend-8c5a7d408193.herokuapp.com/api'; // Replace with your Strapi backend URL

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('file', file);

    try {
      await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setFile(null);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-extrabold text-pink-700 mb-8">Create a New Post</h1>
      {successMessage && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 shadow">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload File (Optional)
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-pink-700 transition-all"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
