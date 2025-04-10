import React from 'react';
import { Sidebar } from './Sidebar';
export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  return <div className="flex w-full min-h-screen bg-[#f8f5f2]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>;
};