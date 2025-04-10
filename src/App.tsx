import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Team } from './pages/Team';
import { AppProvider } from './context/AppContext';
export function App() {
  return <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>;
}