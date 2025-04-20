import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Footer } from '../components/Footer';

export default function Index() {
  const navigate = useNavigate();

  // Parallax effect for hero
  const heroRef = useRef<HTMLDivElement>(null);
  // Scroll to section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scroll-smooth bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen font-sans">
      {/* Navbar */}
      <header className="fixed left-0 top-0 w-full z-20 bg-opacity-70 backdrop-blur border-b border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-semibold text-blue-600 tracking-wide cursor-pointer font-sans" onClick={() => scrollToSection('hero')}>Pop Based</span>
          <nav className="hidden md:flex gap-8 text-base font-medium text-blue-300">
            <button onClick={() => scrollToSection('benefits')} className="hover:text-blue-500 transition">Benefits</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-500 transition">Features</button>
          </nav>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-blue-600 transition flex items-center gap-2"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative flex flex-col justify-center items-center min-h-[90vh] pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-100/60 to-white dark:from-blue-900/30 dark:to-gray-950">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Minimalist workspace inspiration"
            className="w-full h-full object-cover"
            style={{ willChange: 'transform', filter: 'brightness(0.97) saturate(0.9)' }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(20,30,60,0.8) 0%, rgba(20,30,60,0.2) 80%, rgba(20,30,60,0.0) 100%)', backdropFilter: 'blur(2px)'}} />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="text-5xl md:text-7xl font-semibold text-center text-gray-900 dark:text-white mb-6 drop-shadow-lg font-sans tracking-wide relative z-10">
          High-Impact Project <span className="text-blue-500">Collaboration</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .8 }} className="max-w-xl text-center text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 relative z-10">
          Pop Based is your all-in-one workspace to plan, organize, and execute projects with your team — faster, smarter, and more beautiful.
        </motion.p>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/dashboard')} className="px-8 py-4 rounded-xl bg-blue-500 text-white text-lg font-medium shadow-lg hover:bg-blue-600 transition mb-10 flex items-center gap-2 relative z-10">
          Go to Dashboard <ArrowRight size={20} />
        </motion.button>
        {/* Parallax Illustration */}
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Minimalist workspace inspiration"
            className="w-full h-full object-cover"
            style={{ willChange: 'transform', filter: 'brightness(0.97) saturate(0.9)' }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(20,30,60,0.8) 0%, rgba(20,30,60,0.2) 80%, rgba(20,30,60,0.0) 100%)', backdropFilter: 'blur(2px)'}} />
        </div>
      </section>
      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-blue-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">What you get</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Team Collaboration",
                desc: "Work together seamlessly with chat, tasks, and project boards.",
                icon: "🤝"
              },
              {
                title: "Task Management",
                desc: "Create, assign, and track tasks with priorities and deadlines.",
                icon: "✅"
              },
              {
                title: "Real-time Updates",
                desc: "Get notified about assignments and project changes instantly.",
                icon: "⚡"
              },
            ].map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: .5 }} className="rounded-xl bg-white/70 dark:bg-blue-900/10 p-8 shadow hover:shadow-lg transition-all flex flex-col items-center text-center">
                <span className="text-5xl mb-4">{b.icon}</span>
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300 font-sans">{b.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* For Who Section */}
      <section id="forwho" className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">For who?</motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "Startups", icon: "🚀" },
              { label: "Agencies", icon: "🏢" },
              { label: "Remote Teams", icon: "🌍" },
              { label: "Freelancers", icon: "👩‍💻" },
              { label: "Students", icon: "🎓" }
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: .5 }} className="rounded-full bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900 shadow px-7 py-3 flex flex-col items-center">
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Features you'll love</motion.h2>
           <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Kanban Board", desc: "Visualize work and progress with drag-and-drop boards." },
              { title: "Calendar View", desc: "Plan deadlines and milestones visually." },
              { title: "File Sharing", desc: "Upload and manage files in every project." },
              { title: "Integrations", desc: "Connect with Slack, Google Drive, and more." },
              { title: "Custom Roles", desc: "Set permissions for admins and members." },
              { title: "Dark Mode", desc: "Beautiful experience day and night." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: .5 }} className="rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 p-7 shadow hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-300 font-sans">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
