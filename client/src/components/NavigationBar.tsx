import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function NavigationBar() {
    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center justify-between px-6 py-4 lg:px-8 border-b border-gray-200 bg-white"
        >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">A</span>
            </motion.div>
            <span className="text-xl font-semibold text-gray-900">ApprentiLink</span>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/opportunities" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150">
            Opportunities
          </Link>
          <Link href="/companies" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150">
            Companies
          </Link>
          <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150">
            About
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-150">
            Sign in
          </Link>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
          >
            <Link href="/signup" className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all duration-150">
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.nav>
    )
}