import React, { useState, useEffect } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default function PageLayout({ children, sidebarItems, sidebarHeading }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Offline mode - simple black and white interface for children
  if (!isOnline) {
    return (
      <div className="bg-white flex flex-col h-screen font-mono">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 border-4 border-black rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-black mb-4">
              No Internet
            </h1>
            
            <p className="text-lg text-gray-800 mb-6">
              Please check your connection and try again
            </p>
            
            <div className="border-2 border-black p-4 bg-gray-100">
              <p className="text-black font-bold">
                Ask a grown-up to help fix the internet!
              </p>
            </div>
            
            {/* Simple offline activities */}
            <div className="mt-8 space-y-4">
              <div className="border border-black p-3 text-left">
                <h3 className="font-bold text-black">Things you can do:</h3>
                <ul className="mt-2 text-sm text-black">
                  <li>• Draw a picture</li>
                  <li>• Read a book</li>
                  <li>• Play with toys</li>
                  <li>• Help with chores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal online mode
  return (
    <div className="bg-green-25 flex flex-col h-screen">
        {/* Fixed Header */}
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* Container for Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} onClose={toggleSidebar} />
            
            {/* Main Content - Scrollable Area */}
            <main className={`
                transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 ease-in-out flex-1 overflow-y-auto
                ${isSidebarOpen ? 'ml-64' : 'ml-16'}
            `}>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    </div>
  );
}