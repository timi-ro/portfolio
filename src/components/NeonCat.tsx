import type { CatArt } from '@/components/catArt';
import { cn } from '@/lib/utils';

interface NeonCatProps {
  art: CatArt;
  glowId: string;
  lineClass: string;
  eyeClass: string;
}

// One cat: a page-coloured backing, then glowing line work, a blinking eye and, if it has one, a swaying tail
export function NeonCat({ art, glowId, lineClass, eyeClass }: NeonCatProps) {
  const [width, height] = art.viewBox;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
      <defs>
        {/* Neon glow: a soft blur of the lines layered under the crisp lines */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={art.backing} className="fill-paper" />
      <g filter={`url(#${glowId})`} fill="none" strokeLinecap="round" strokeLinejoin="round" className={lineClass}>
        {art.lines.map((d) => (
          // Non-scaling so the line stays 0.7px however small the cat is drawn
          <path key={d} d={d} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
        ))}
        {art.tail && <path d={art.tail} strokeWidth={0.7} vectorEffect="non-scaling-stroke" className="cat-tail" />}
        <path d={art.eye} stroke="none" className={cn('cat-eyes', eyeClass)} />
      </g>
    </svg>
  );
}
