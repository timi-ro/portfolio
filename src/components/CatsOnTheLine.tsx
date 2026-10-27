'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BIG_CAT, SMALL_CAT } from '@/components/catArt';
import { NeonCat } from '@/components/NeonCat';
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
// They count as apart once the page scrolls this far on desktop, where she sets off as soon as it
// moves (on smaller screens, once she's in her corner), and as together again within MEET_WITHIN
// of the top (both in px)
const APART_AFTER = 24;
const MEET_WITHIN = 8;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Two cats that start together at the top. On desktop they sit on the sidebar's wavy divider and
// the small one walks down the line as the page scrolls; on smaller screens she waits in the
// bottom-right corner. Either way she asks to be taken back up, and clicking her scrolls the page
// to the top. Every time the two meet again, whether she was carried up or the page was scrolled
// back by hand, a heart floats up between them.
export function CatsOnTheLine() {
  const smallRef = useRef<HTMLButtonElement>(null);
  const scrollAnimation = useRef(0);
  const climbingRef = useRef(false);
  // Small screens: after riding back up she stays where she landed until she next sets off
  const landedRef = useRef(false);
  // Whether she's been away since they last met, so the next meeting gets a heart
  const apartRef = useRef(false);
  const heartTimer = useRef(0);
  // Right edge of the sidebar: the divider on desktop, the content's right edge on smaller screens
  const [anchor, setAnchor] = useState<{ x: number; desktop: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [climbing, setClimbing] = useState(false);
  const [landed, setLanded] = useState(false);
  const [reunited, setReunited] = useState(false);

  const celebrate = useCallback(() => {
    apartRef.current = false;
    setReunited(true);
    // A fresh heart gets its full time, even if the last one hasn't faded yet
    window.clearTimeout(heartTimer.current);
    heartTimer.current = window.setTimeout(() => setReunited(false), 1600);
  }, []);

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
      // A heart each time she's back beside the big cat after being away, however far she went. A
      // ride back up (climbing) gets its heart when it lands, as no scroll may follow the last step.
      if (climbingRef.current || window.scrollY > (desktop ? APART_AFTER : MOBILE_SHOW_AFTER)) {
        apartRef.current = true;
      } else if (apartRef.current && window.scrollY <= MEET_WITHIN) {
        celebrate();
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
      window.clearTimeout(heartTimer.current);
    };
  }, [celebrate]);

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

      {/* A little neon heart above their heads when they meet again */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn(
          'pointer-events-none z-20 drop-shadow-[0_0_4px_var(--cat-heart)] transition-all duration-700 ease-out motion-reduce:transition-none',
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
        <path
          d="M12 21S3 15.4 3 9.3C3 6.3 5.3 4 8.2 4c1.6 0 3 .8 3.8 2.1C12.8 4.8 14.2 4 15.8 4 18.7 4 21 6.3 21 9.3 21 15.4 12 21 12 21z"
          className="fill-cat-heart"
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
        {/* Her thought, in a neon cloud over her head. She faces left, so it leans that way, which
            also keeps it on screen when she waits in the bottom-right corner. */}
        <span
          className={cn(
            'pointer-events-none absolute bottom-full -left-35.5 h-18 w-44 transition-opacity duration-300',
            asking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
            climbing && 'opacity-0 group-hover:opacity-0'
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 176 72"
            className="absolute inset-0 h-full w-full overflow-visible fill-paper stroke-cat-small drop-shadow-[0_0_3px_var(--cat-small)]"
          >
            <path
              d="M8 25A7.7 7.7 0 0 1 18.7 16.5A16.8 16.8 0 0 1 48 10.3A22.4 22.4 0 0 1 88 8A22.4 22.4 0 0 1 128 10.3A16.8 16.8 0 0 1 157.3 16.5A7.7 7.7 0 0 1 168 25A8.8 8.8 0 0 1 157.3 33.5A19.2 19.2 0 0 1 128 39.7A25.6 25.6 0 0 1 88 42A25.6 25.6 0 0 1 48 39.7A19.2 19.2 0 0 1 18.7 33.5A8.8 8.8 0 0 1 8 25Z"
              strokeWidth={1}
            />
            {/* Bubbles trailing down to her head */}
            <circle cx={147} cy={55} r={4} strokeWidth={1} />
            <circle cx={153} cy={65} r={2.4} strokeWidth={1} />
          </svg>
          <span className="absolute inset-x-0 top-0 flex h-12.5 items-center justify-center whitespace-nowrap font-mono text-[11px] text-ink">
            Take me to the top ↑
          </span>
        </span>
        <span className="block h-full w-full transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
          <NeonCat art={SMALL_CAT} glowId="cat-glow-small" lineClass="stroke-cat-small" eyeClass="fill-cat-small-eye" />
        </span>
      </button>
    </div>
  );
}
