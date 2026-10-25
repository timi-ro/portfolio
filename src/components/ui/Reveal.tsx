'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  // Seconds to wait before animating, for staggering items in a group
  delay?: number;
}

// Fades and slides content up when it scrolls into view, matching the Experience timeline.
// Content starts visible (so the page works without JS) and is hidden only once the
// observer reports it off-screen.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        } else {
          setHidden(true);
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        hidden ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100',
        className
      )}
    >
      {children}
    </div>
  );
}
