import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {fadeInUp} from "@/lib/framer-motion-animation";

export default function Footer() {
    return (
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
        )
}