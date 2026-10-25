import { cn } from '@/lib/utils';

interface BlackCatProps {
  className?: string;
}

// A small sitting black cat with blinking eyes and a swaying tail (animations in globals.css).
// On a dark background it's mostly just the eyes.
export function BlackCat({ className }: BlackCatProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={cn('text-[#141416]', className)}>
      <path
        d="M33 46c8 0 12-5 10-11-1-3-4-4-5-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="cat-tail"
      />
      <path d="M13 47c-2-12 3-23 11-24 8 1 13 12 11 24z" fill="currentColor" />
      <path d="M16 13l1.5-9 6 5.5h1l6-5.5 1.5 9z" fill="currentColor" />
      <circle cx="24" cy="16" r="8.5" fill="currentColor" />
      <g className="cat-eyes">
        <ellipse cx="20.5" cy="16" rx="1.6" ry="2" className="fill-accent" />
        <ellipse cx="27.5" cy="16" rx="1.6" ry="2" className="fill-accent" />
      </g>
    </svg>
  );
}
