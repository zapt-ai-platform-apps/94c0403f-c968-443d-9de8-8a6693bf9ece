import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-green-400">Dump.fun</h3>
            <p className="text-gray-400 text-sm">
              AI-powered analytics for Pump.fun developers
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">
              Data is scraped from Pump.fun and updated regularly
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dump.fun
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}