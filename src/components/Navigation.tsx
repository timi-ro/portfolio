'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0F]/95 backdrop-blur-lg border-b border-zinc-900'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo with decorative line art */}
          <div className="relative">
            {/* Decorative line art - part of logo - half hidden when scrolled */}
            <div className={`absolute -left-20 -top-10 opacity-30 overflow-hidden transition-all duration-300 ${
              isScrolled ? 'h-[100px] w-[200px]' : 'h-[200px] w-[200px]'
            }`}>
              <svg width="200" height="200" className="absolute top-0 left-0">
                <line x1="0" y1="100" x2="200" y2="100" stroke="#06B6D4" strokeWidth="1"/>
                <line x1="100" y1="0" x2="100" y2="200" stroke="#06B6D4" strokeWidth="1"/>
                <circle cx="100" cy="100" r="30" stroke="#06B6D4" strokeWidth="1" fill="none"/>
                <circle cx="100" cy="100" r="50" stroke="#06B6D4" strokeWidth="1" fill="none"/>
              </svg>
            </div>

            <a href="#hero" className="flex items-center gap-0.5 relative z-10">
              <span className="text-2xl font-light tracking-[0.5em] text-cyan-500">F</span>
              <span className="text-2xl font-light tracking-[0.5em] text-white">R</span>
            </a>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] tracking-[0.2em] text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-zinc-500 hover:text-white transition-colors relative z-50"
            aria-label="Toggle menu"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-[#0A0A0F]/98 backdrop-blur-lg z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMobileMenu}
              className={`text-2xl tracking-[0.2em] text-zinc-500 hover:text-white transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.name}
            </a>
          ))}

          {/* Decorative element */}
          <div className={`mt-12 transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-20 scale-100' : 'opacity-0 scale-90'
          }`}>
            <svg width="150" height="150">
              <circle cx="75" cy="75" r="60" stroke="#06B6D4" strokeWidth="1" fill="none"/>
              <circle cx="75" cy="75" r="40" stroke="#06B6D4" strokeWidth="1" fill="none"/>
              <circle cx="75" cy="75" r="20" stroke="#06B6D4" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}