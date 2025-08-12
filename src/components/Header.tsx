import React from 'react';
import { MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AllReady</h1>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm text-gray-300">Community Marketing Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;