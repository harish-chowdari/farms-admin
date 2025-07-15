import { Bell, Search, Sprout, User, Wifi, WifiOff } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logo } from '../../assets'

export default function Header() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const navigate = useNavigate()

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        // window.addEventListener('online', handleOnline)
        // window.addEventListener('offline', handleOffline)  

        return () => {
            // window.removeEventListener('online', handleOnline)
            // window.removeEventListener('offline', handleOffline) 
        }
    }, [])

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 z-50">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <img className='w-8 h-8' src={logo} alt='logo' />
                        <div onClick={() => navigate('/')} className='cursor-pointer'>
                            <h1 className="text-lg font-bold text-green-800">Sunotal Farms</h1>
                            <p className="text-xs text-green-600">Lead Tomorrow's Agriculture</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center md:space-x-4 space-x-2">
                    {/* Network Status Indicator */}
                    <div className="flex items-center md:space-x-2 space-x-1">
                        <div className={`flex items-center md:space-x-1 md:px-2 md:py-1 p-1 rounded-full text-xs font-medium transition-all duration-300 ${
                            isOnline 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                            {isOnline ? (
                                <>
                                    <Wifi className="w-3 h-3" />
                                    <span className="hidden sm:inline">Online</span>
                                </>
                            ) : (
                                <>
                                    <WifiOff className="w-3 h-3" />
                                    <span className="hidden sm:inline">Offline</span>
                                </>
                            )}
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isOnline 
                                ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                                : 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse'
                        }`}></div>
                    </div>

                    {/* <div className="relative hidden md:block">
                        <Search className="w-4 h-4 text-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div> */}
                
                    <button className="relative p-2 rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                        <Bell className="w-5 h-5 text-green-600" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>
                    
                    <button className="flex items-center cursor-pointer md:space-x-2 md:p-2 p-2 rounded-lg hover:bg-green-50 transition-colors">
                        <User className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800 hidden md:block">Admin</span>
                    </button>
                </div>
            </div>
        </header>
    )
}