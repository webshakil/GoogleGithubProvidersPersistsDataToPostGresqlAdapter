'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="flex items-center justify-center w-full p-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          <FaGithub className="mr-2" /> Sign in with GitHub
        </button>
      </div>
    </div>
  );
}