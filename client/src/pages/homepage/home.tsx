'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, UserGroupIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { motion, Variants } from 'framer-motion';

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Crisp animation variants with sharp easing
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const snapIn: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.35, 
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div 
              variants={snapIn}
              className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 mb-8"
            >
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
              Connecting talent with opportunity
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8"
            >
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Career Journey
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with top apprenticeship opportunities across aerospace, engineering, and technology. 
              We bridge the gap between ambitious talent and leading companies.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Link href="/opportunities" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-indigo-700 transition-all duration-150">
                  <span>Explore Opportunities</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Link href="/learn-more" className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-150">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-base font-semibold text-indigo-600 mb-4">What We Do</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Connecting Talent with Excellence
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in matching exceptional apprenticeship candidates with leading companies 
              who value talent, ambition, and technical excellence.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-12 lg:grid-cols-3"
          >
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 mb-6"
              >
                <BriefcaseIcon className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Curated Opportunities
              </h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Access exclusive apprenticeship positions with top-tier companies actively seeking 
                exceptional talent across aerospace, engineering, and technology sectors.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 mb-6"
              >
                <UserGroupIcon className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Matching
              </h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Our intelligent matching system connects candidates with roles that align 
                with their skills, interests, and career aspirations for optimal success.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 mb-6"
              >
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Career Support
              </h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Comprehensive support including interview preparation, skills assessment, 
                and ongoing mentorship to ensure long-term career success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-base font-semibold text-indigo-600 mb-4">How It Works</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Your Journey to Success
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, streamlined process designed to connect you with your ideal opportunity
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg mb-6"
              >
                1
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Build a comprehensive profile showcasing your skills, experience, and career goals. 
                Our platform highlights what makes you unique.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 text-white font-bold text-lg mb-6"
              >
                2
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Get Matched</h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Our intelligent matching algorithm connects you with opportunities that align 
                with your skills, interests, and career aspirations.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold text-lg mb-6"
              >
                3
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Start Your Career</h4>
              <p className="text-base text-gray-600 leading-relaxed">
                Connect directly with employers, complete the interview process, and begin 
                your exciting new career journey with ongoing support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="py-24 bg-indigo-600"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Launch Your Career?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto"
          >
            Join the next generation of professionals finding their perfect opportunity 
            through ApprentiLink. Your future starts here.
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              variants={fadeInLeft}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-600 px-8 py-4 text-base font-medium shadow-lg hover:bg-gray-50 transition-all duration-150">
                Get Started Today
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Link href="/opportunities" className="inline-flex items-center justify-center rounded-xl border-2 border-white text-white px-8 py-4 text-base font-medium hover:bg-white hover:text-indigo-600 transition-all duration-150">
                Browse Opportunities
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <span className="text-white font-bold text-lg">A</span>
                </motion.div>
                <span className="text-xl font-semibold text-white">ApprentiLink</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Connecting exceptional apprenticeship talent with leading companies across multiple industries.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/opportunities" className="text-gray-400 hover:text-white transition-colors duration-150">Opportunities</Link></li>
                <li><Link href="/companies" className="text-gray-400 hover:text-white transition-colors duration-150">Companies</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white transition-colors duration-150">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-150">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-150">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-150">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <p className="text-center text-gray-400">
              &copy; 2025 ApprentiLink. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;