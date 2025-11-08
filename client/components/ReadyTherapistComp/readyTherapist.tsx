"use client";

import React, { useState, useEffect } from "react";

const ReadyExperts = () => {
  const [onlineExperts, setOnlineExperts] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setOnlineExperts(prev => Math.max(2, Math.min(5, prev + (Math.random() > 0.5 ? 1 : -1))));
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const experts = [
    { name: "Dr. Karan Kumar", specialty: "General Physician", avatar: "KK", color: "from-blue-500 to-indigo-600" },
    { name: "Dr. Mohit Sharma", specialty: "Cardiologist", avatar: "MS", color: "from-purple-500 to-pink-600" },
    { name: "Dr. Priya Verma", specialty: "Dermatologist", avatar: "PV", color: "from-green-500 to-emerald-600" }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>
            </div>
          </div>

          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-white text-sm font-medium">Live Now</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Indian Doctors Available Right Now
                </h2>
                <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
                  Connect instantly with verified Indian medical professionals ready to assist you with expert consultations
                </p>
              </div>

              {/* Stats Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[280px]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold text-white transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                      {onlineExperts}+
                    </div>
                    <div className="text-blue-100 text-sm">Doctors Online</div>
                  </div>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Average response: 5 minutes
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {experts.map((expert, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${expert.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {expert.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{expert.name}</h3>
                      <p className="text-blue-100 text-sm">{expert.specialty}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-100">Available Now</span>
                    <div className="flex items-center gap-1 text-yellow-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-semibold">4.9</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Instant Connect</h4>
                  <p className="text-blue-100 text-sm">Get matched with a doctor in under 15 minutes</p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Now
                </button>
                <button className="flex-1 sm:flex-none px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/30 transition-all duration-300">
                  View All Doctors
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-100 text-sm">Available Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-blue-100 text-sm">Consultations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-blue-100 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">5 min</div>
                <div className="text-blue-100 text-sm">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyExperts;