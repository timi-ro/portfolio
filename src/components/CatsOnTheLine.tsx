'use client';

import { useEffect, useRef, useState } from 'react';
import { BIG_CAT, SMALL_CAT, type CatArt } from '@/components/catArt';
import { cn } from '@/lib/utils';

const DESKTOP = '(min-width: 1024px)';
// Where they touch when together: the small cat's nose tucks just under the big cat's chin
// (both in source-image pixels)
const BIG_CHIN = { x: 472, y: 234 };
const SMALL_NOSE = { x: 14, y: 16 };

// Sizes and offsets of the pair at a given scale (the traced art is in source-image pixels).
// The x offsets are measured from the point where the two cats touch.
function pairGeometry(scale: number) {
  return {
    big: { width: BIG_CAT.viewBox[0] * scale, height: BIG_CAT.viewBox[1] * scale },
    small: { width: SMALL_CAT.viewBox[0] * scale, height: SMALL_CAT.viewBox[1] * scale },
    bigX: -1 - BIG_CHIN.x * scale,
    smallX: -SMALL_NOSE.x * scale,
    // The small cat sits a little lower, so her nose meets the big cat's chin
    smallTop: BIG_CHIN.y * scale + 1.5 - SMALL_NOSE.y * scale,
  };
}

// Desktop: the pair sits on the sidebar's divider, fixed at the top of the screen
const DESKTOP_PAIR = pairGeometry(0.12);
const PAIR_TOP = 40;
const BOTTOM_GAP = 12;
// Share of the page scroll over which the small cat steps onto the line, so it runs through her middle
const STEP_ONTO_LINE = 0.08;
// Scroll progress (0–1) after which the small cat asks to go back up
const ASK_AFTER = 0.85;

// Smaller screens have no divider: the pair sits at the top right of the page, and the small cat
// waits in the bottom-right corner once the page has scrolled this far
const MOBILE_PAIR = pairGeometry(0.1);
const MOBILE_PAIR_TOP = 56;
const MOBILE_SHOW_AFTER = 250;

// The heart floats centred between their heads, just above the big cat's ears
const HEART = { centerX: 2, above: 16, size: 14 };

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

interface NeonCatProps {
  art: CatArt;
  glowId: string;
  lineClass: string;
  eyeClass: string;
}

// One cat: a page-coloured backing, then glowing line work and a blinking eye
function NeonCat({ art, glowId, lineClass, eyeClass }: NeonCatProps) {
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
        <path d={art.eye} stroke="none" className={cn('cat-eyes', eyeClass)} />
      </g>
    </svg>
  );
}

// Two cats that start together at the top. On desktop they sit on the sidebar's wavy divider and
// the small one walks down the line as the page scrolls; on smaller screens she waits in the
// bottom-right corner. Either way she asks to be taken back up, and clicking her scrolls the page
// to the top, where the two meet again.
export function CatsOnTheLine() {
  const smallRef = useRef<HTMLButtonElement>(null);
  const scrollAnimation = useRef(0);
  const climbingRef = useRef(false);
  // Small screens: after riding back up she stays where she landed until she next sets off
  const landedRef = useRef(false);
  // Right edge of the sidebar: the divider on desktop, the content's right edge on smaller screens
  const [anchor, setAnchor] = useState<{ x: number; desktop: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [climbing, setClimbing] = useState(false);
  const [landed, setLanded] = useState(false);
  const [reunited, setReunited] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      const desktop = window.matchMedia(DESKTOP).matches;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
      const el = smallRef.current;

      // The walk is applied straight to the element so it tracks the scroll without re-rendering
      if (el && desktop) {
        const travel =
          window.innerHeight - PAIR_TOP - DESKTOP_PAIR.smallTop - DESKTOP_PAIR.small.height - BOTTOM_GAP;
        const step = Math.min(nextProgress / STEP_ONTO_LINE, 1);
        const stepX = (-DESKTOP_PAIR.small.width / 2 - DESKTOP_PAIR.smallX) * step * step * (3 - 2 * step);
        el.style.transform = `translate(${stepX}px, ${nextProgress * travel}px)`;
      } else if (el && !climbingRef.current && (!landedRef.current || window.scrollY > MOBILE_SHOW_AFTER)) {
        // Back to her corner (she's hidden whenever this changes, so the jump isn't seen)
        el.style.transform = '';
        if (landedRef.current) {
          landedRef.current = false;
          setLanded(false);
        }
      }
      setAnchor({ x: sidebar.getBoundingClientRect().right, desktop });
      setProgress(nextProgress);
      setScrollY(window.scrollY);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollAnimation.current);
    };
  }, []);

  if (!anchor) return null;

  const { desktop } = anchor;
  const pair = desktop ? DESKTOP_PAIR : MOBILE_PAIR;
  const pairTop = desktop ? PAIR_TOP : MOBILE_PAIR_TOP;
  // The point where the two cats touch: on the divider, or at the top right of the page
  const contactX = desktop ? anchor.x : anchor.x - pair.small.width - pair.smallX;
  // Desktop: fixed to the screen. Smaller screens: part of the page, so the pair scrolls away
  const placement = desktop ? 'fixed' : 'absolute';
  // Smaller screens: whether she's in her corner (or on her way back up) rather than at home
  const waiting = !desktop && (scrollY > MOBILE_SHOW_AFTER || climbing);
  const asking = !climbing && (desktop ? progress > ASK_AFTER : waiting);
  const awayFromTop = desktop ? progress > 0.02 : waiting;

  const bringToTop = () => {
    if (climbingRef.current) return;
    const celebrate = () => {
      setReunited(true);
      window.setTimeout(() => setReunited(false), 1600);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      celebrate();
      return;
    }

    // Ease the page up. On desktop the small cat follows the scroll back up the line; on smaller
    // screens she rides from her corner to her spot beside the other cat, landing as the page does.
    const el = smallRef.current;
    const from = !desktop && el ? el.getBoundingClientRect() : null;
    const homeX = contactX + pair.smallX;
    const startY = window.scrollY;
    const duration = Math.min(900 + startY * 0.15, 1800);
    const start = performance.now();
    climbingRef.current = true;
    setClimbing(true);
    const step = (now: number) => {
      const eased = easeInOutCubic(Math.min((now - start) / duration, 1));
      const y = startY * (1 - eased);
      // 'instant' so the page's CSS smooth scrolling doesn't add its own lagging animation
      window.scrollTo({ top: y, behavior: 'instant' });
      if (from && el) {
        // Her spot is above the screen until the page arrives, so she climbs to the top edge and
        // waits there, then settles in as the top of the page comes into view
        const homeY = Math.max(pairTop + pair.smallTop - y, 8);
        el.style.transform = `translate(${(homeX - from.left) * eased}px, ${(homeY - from.top) * eased}px)`;
      }
      if (eased < 1) {
        scrollAnimation.current = requestAnimationFrame(step);
        return;
      }
      climbingRef.current = false;
      if (from) {
        landedRef.current = true;
        setLanded(true);
      }
      setClimbing(false);
      celebrate();
    };
    scrollAnimation.current = requestAnimationFrame(step);
  };

  return (
    <div className="print:hidden">
      {/* The big cat stays at the top */}
      <div
        className={cn('pointer-events-none z-20', placement)}
        style={{ left: contactX + pair.bigX, top: pairTop, width: pair.big.width, height: pair.big.height }}
      >
        <NeonCat art={BIG_CAT} glowId="cat-glow-big" lineClass="stroke-cat-big" eyeClass="fill-cat-big-eye" />
      </div>

      {/* Smaller screens: the small cat's place beside her while she's at home. When she lands back
          here, the moving cat fades out over this one, so the hand-over can't be seen. */}
      {!desktop && (
        <div
          className={cn(
            'pointer-events-none absolute z-20 transition-opacity duration-500 motion-reduce:transition-none',
            waiting ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            left: contactX + pair.smallX,
            top: pairTop + pair.smallTop,
            width: pair.small.width,
            height: pair.small.height,
          }}
        >
          <NeonCat
            art={SMALL_CAT}
            glowId="cat-glow-small-home"
            lineClass="stroke-cat-small"
            eyeClass="fill-cat-small-eye"
          />
        </div>
      )}

      {/* A little heart above their heads when they meet again */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn(
          'pointer-events-none z-20 drop-shadow-[0_0_3px_var(--cat-big)] transition-all duration-700 ease-out motion-reduce:transition-none',
          placement,
          reunited ? '-translate-y-2.5 opacity-100' : 'translate-y-0 opacity-0'
        )}
        style={{
          left: contactX + HEART.centerX - HEART.size / 2,
          top: pairTop - HEART.above,
          width: HEART.size,
          height: HEART.size,
        }}
      >
        <defs>
          <linearGradient id="cat-heart" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--cat-big)' }} />
            <stop offset="1" style={{ stopColor: 'var(--cat-small)' }} />
          </linearGradient>
        </defs>
        <path
          d="M12 21S3 15.4 3 9.3C3 6.3 5.3 4 8.2 4c1.6 0 3 .8 3.8 2.1C12.8 4.8 14.2 4 15.8 4 18.7 4 21 6.3 21 9.3 21 15.4 12 21 12 21z"
          fill="url(#cat-heart)"
        />
      </svg>

      <button
        ref={smallRef}
        type="button"
        onClick={bringToTop}
        aria-label="Back to top"
        aria-hidden={!awayFromTop}
        tabIndex={awayFromTop ? 0 : -1}
        className={cn(
          'group fixed z-20 cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
          !desktop &&
            'bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] right-4 transition-[translate,opacity] duration-500 ease-out',
          // Having just landed she fades in place; otherwise she slips away down into her corner
          !desktop && (waiting ? 'translate-y-0 opacity-100' : cn('pointer-events-none opacity-0', !landed && 'translate-y-4')),
          desktop && !awayFromTop && 'pointer-events-none'
        )}
        style={
          desktop
            ? {
                left: contactX + pair.smallX,
                top: pairTop + pair.smallTop,
                width: pair.small.width,
                height: pair.small.height,
              }
            : { width: pair.small.width, height: pair.small.height }
        }
      >
        <span
          className={cn(
            'pointer-events-none absolute right-full top-0 mr-2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 font-mono text-[11px] text-paper shadow-sm transition-opacity duration-300',
            "after:absolute after:left-full after:top-2.5 after:border-[5px] after:border-transparent after:border-l-ink after:content-['']",
            asking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
            climbing && 'opacity-0 group-hover:opacity-0'
          )}
        >
          Take me to the top ↑
        </span>
        <span className="block h-full w-full transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
          <NeonCat art={SMALL_CAT} glowId="cat-glow-small" lineClass="stroke-cat-small" eyeClass="fill-cat-small-eye" />
        </span>
      </button>
    </div>
  );
}
