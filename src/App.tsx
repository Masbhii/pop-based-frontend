import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import Index from './pages/Index';
import { Schedule } from './pages/Schedule';
import { Team } from './pages/Team';
import { AppProvider } from './context/AppContext';
import { motion } from 'framer-motion';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Index />
              </motion.div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Layout>
                  <Dashboard />
                </Layout>
              </motion.div>
            }
          />
          <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
          <Route path="/team" element={<Layout><Team /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}