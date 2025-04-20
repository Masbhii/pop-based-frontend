import React from 'react';

export const Footer: React.FC = () => (
  <footer className="w-full bg-gray-900 text-gray-200 py-8 border-t border-gray-800 mt-16">
    <div className="container mx-auto px-6 flex flex-col items-center">
      <a rel="noreferrer" href="#top" className="mb-4 hover:text-blue-400 transition" aria-label="Back to top">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
          <path d="M16 24V8M16 8L8 16M16 8l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="flex space-x-6 mb-4">
        <a rel="noreferrer" href="https://x.com/phonecats7" target="_blank" aria-label="Twitter/X" className="hover:text-blue-400 transition">
          <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1152.36 0H918.36L600 431.16 281.64 0H47.64l399.36 560.52L0 1227h234.24L600 751.56 965.76 1227H1200L800.64 666.48 1152.36 0ZM300.12 110.28h107.64l192.24 270.96L300.12 110.28ZM899.88 110.28l-299.88 420.36 192.24-270.96h107.64ZM600 678.36l-192.24 270.96h384.48L600 678.36ZM192.24 1105.44l299.88-420.36-192.24 270.96H192.24ZM1007.76 1105.44h-107.64l-192.24-270.96 299.88 420.36Z"/></svg>
        </a>
        <a rel="noreferrer" href="https://www.linkedin.com/in/bhiazhr" target="_blank" aria-label="LinkedIn" className="hover:text-blue-400 transition">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.28c.41-.6 1.22-1.28 2.5-1.28 1.93 0 3.5 1.57 3.5 3.5v5.5z"/></svg>
        </a>
        <a rel="noreferrer" href="https://github.com/Masbhii" target="_blank" aria-label="GitHub" className="hover:text-blue-400 transition">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.57-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.08 11.08 0 012.9-.39c.98.01 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.09.8 2.2v3.26c0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
        </a>
      </div>
      <hr className="w-full border-gray-700 mb-4" />
      <p className="text-sm text-gray-400 text-center">
        © 2024 - Template developed by{' '}
        <a rel="noreferrer" href="https://github.com/Masbhii" target="_blank" className="text-blue-400 hover:underline">Masbhii</a>
      </p>
    </div>
  </footer>
);
