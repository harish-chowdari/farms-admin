import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default function PageLayout({ children, sidebarItems, sidebarHeading }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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