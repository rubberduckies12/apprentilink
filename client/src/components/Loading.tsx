import React from 'react';

export default function Loading(){
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