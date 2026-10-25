'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Off the clock', id: 'off-the-clock' },
  { name: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [active, setActive] = useState('about');

  // Highlight the section that occupies the upper part of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mt-14 hidden lg:block" aria-label="Sections">
      <ul className="space-y-1">
        {navLinks.map(({ name, id }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-4 py-2"
              >
                <span
                  className={cn(
                    'h-px transition-all duration-200',
                    isActive ? 'w-16 bg-accent-2' : 'w-8 bg-subtle group-hover:w-16 group-hover:bg-accent-2'
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-xs uppercase tracking-widest transition-colors',
                    isActive ? 'text-ink' : 'text-subtle group-hover:text-ink'
                  )}
                >
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
