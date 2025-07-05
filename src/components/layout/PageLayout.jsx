import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default function PageLayout({ children, sidebarItems, sidebarHeading }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-green-25">
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} onClose={toggleSidebar} />
        
        {/* Main Content - Right Side Outlet */}
        <main className={`
            pt-16 transition-all duration-300 ease-in-out min-h-screen
            ${isSidebarOpen ? 'ml-64' : 'ml-16'}
        `}>
            <div className="p-6">
            {children}
            </div>
        </main>
    </div>
  );
}
