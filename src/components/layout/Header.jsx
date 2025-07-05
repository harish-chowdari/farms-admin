import { Bell, Search, Sprout, User } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
  <header className="bg-white shadow-sm border-b border-gray-200 z-50">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <div onClick={() => window.location.href = '/'} className='cursor-pointer'>
                            <h1 className="text-lg font-bold text-green-800">Sunotal Farms</h1>
                            <p className="text-xs text-green-600">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 text-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                
                    <button className="relative p-2 rounded-lg hover:bg-green-50 transition-colors">
                        <Bell className="w-5 h-5 text-green-600" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>
                    
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-50 transition-colors">
                        <User className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800 hidden md:block">Admin</span>
                    </button>
                </div>
            </div>
        </header>
    )
}
