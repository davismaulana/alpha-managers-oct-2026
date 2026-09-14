import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TICKET_URL, trackTicketCTA } from '../../lib/constants';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  const handlePayment = () => {
    trackTicketCTA();
    setMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-xl border-b border-gold-500/10 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.95)]",
        scrolled ? "py-4" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/alpha-leaders-logo-yellow.png"
            alt="Alpha Leaders Community"
            className="h-10 w-auto md:h-12"
          />
          <div className="leading-none">
            <p className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-white/85">Alpha Leaders</p>
            <p className="mt-1 text-sm md:text-base tracking-[0.32em] uppercase text-white">Community</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 border border-gold-500/20 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-400 text-xs font-semibold tracking-wider uppercase">Sesi Eksklusif</span>
          </div>

          <a
            href={TICKET_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-4 text-sm font-bold text-black shadow-lg shadow-gold-900/20 transition-all hover:from-gold-400 hover:to-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 md:flex"
            onClick={trackTicketCTA}
          >
            Bayar Tiket <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-white/5"
          >
            <div className="container mx-auto px-4 py-6">
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-4 text-base font-bold text-black shadow-lg shadow-gold-900/20 transition-all hover:from-gold-400 hover:to-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                onClick={handlePayment}
              >
                Bayar Tiket <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Navigation };
