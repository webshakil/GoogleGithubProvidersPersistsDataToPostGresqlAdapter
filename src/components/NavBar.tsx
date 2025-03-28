'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaHamburger } from 'react-icons/fa'; // Hamburger icon
import { IoCloseCircleSharp } from 'react-icons/io5'; // Close icon
import { signOut, useSession } from 'next-auth/react'; // Client-side signOut and session

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const { data: session, status } = useSession(); 

  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/login' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = status === 'authenticated';

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
            {/* Conditional Rendering */}
            {!isAuthenticated && (
              <>
                <Link href="/register" className="hover:text-gray-300 transition-colors">
                  Register
                </Link>
                <Link href="/auth/login" className="hover:text-gray-300 transition-colors">
                  Login
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link
                href="/auth/login" // Fallback href, overridden by signOut redirect
                onClick={handleSignout}
                className="hover:text-gray-300 transition-colors"
              >
                LogOut
              </Link>
            )}
          </div>

          {/* Hamburger Button (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FaHamburger className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} />
              <IoCloseCircleSharp className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Contact
            </Link>
            {/* Conditional Rendering for Mobile */}
            {!isAuthenticated && (
              <>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link
                href="/auth/login"
                onClick={handleSignout}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
              >
                LogOut
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




