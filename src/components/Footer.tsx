import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-300">
            © {currentYear} AllReady. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Community Marketing Manager
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;