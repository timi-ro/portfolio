'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

// Characters for the falling columns, plus whole tokens that occasionally fall on their own
const GLYPHS = '01{}[]()<>/;=+*#$&|!?:.'.split('');
const TOKENS = [
  '</>', '=>', '{ }', 'const', 'null', 'git push', '&&', '// TODO', 'fn()',
  '=^.^=', '△ ○ ✕ □', 'GG', '+100 XP', '1UP', 'respawn()',
];

// Small 24x24 icons drawn on the canvas, tinted like the rest of the rain
const ICONS: { path: string; stroke?: boolean }[] = [
  // Black cat head, with eyes cut out
  { path: 'M3 2l5 5h8l5-5v10a9 8 0 0 1-18 0z M8.5 11a1.3 1.6 0 1 0 .01 0z M15.5 11a1.3 1.6 0 1 0 .01 0z' },
  // Paw print
  {
    path: 'M12 12c-3 0-6 3-6 5.5S8 21 12 21s6-1 6-3.5S15 12 12 12z M4 8.5a2 2.5 0 1 0 .01 0z M8.5 4a2 2.5 0 1 0 .01 0z M14.5 4a2 2.5 0 1 0 .01 0z M19 8.5a2 2.5 0 1 0 .01 0z',
  },
  // Game controller
  { path: 'M7 7h10a5 5 0 0 1 4.8 6.4l-1.3 4.3a2.5 2.5 0 0 1-4.3.9L14.5 16h-5l-1.7 2.6a2.5 2.5 0 0 1-4.3-.9l-1.3-4.3A5 5 0 0 1 7 7z' },
  // Crosshair
  { path: 'M12 2v6M12 16v6M2 12h6M16 12h6M12 6a6 6 0 1 0 .01 0z', stroke: true },
  // Glasses
  { path: 'M2 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0z M14 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0z M10 13.5q2-1.5 4 0 M2 14 1 9 M22 14l1-5', stroke: true },
];

const STORAGE_KEY = 'code-rain';
const FONT_SIZE = 13;
const ICON_SIZE = 16;
const FRAME_MS = 1000 / 30;

interface Drop {
  x: number;
  y: number;
  speed: number;
  // Text drops are a column of glyphs or a single token; icon drops draw one icon
  chars: string[];
  icon?: number;
  rotation: number;
  spin: number;
  secondary: boolean;
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function makeDrop(width: number, height: number, startAbove = false): Drop {
  const roll = Math.random();
  const isIcon = roll < 0.08;
  const isToken = !isIcon && roll < 0.2;
  return {
    x: Math.random() * width,
    y: startAbove ? -Math.random() * height * 0.5 : Math.random() * height,
    speed: 0.6 + Math.random() * 1.2,
    chars: isIcon ? [] : isToken ? [pick(TOKENS)] : Array.from({ length: 5 + Math.floor(Math.random() * 8) }, () => pick(GLYPHS)),
    icon: isIcon ? Math.floor(Math.random() * ICONS.length) : undefined,
    rotation: isIcon ? (Math.random() - 0.5) * 0.6 : 0,
    spin: isIcon ? (Math.random() - 0.5) * 0.01 : 0,
    // Icons always use the second accent; about a third of the code does too
    secondary: isIcon || Math.random() < 0.35,
  };
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const TOGGLE_EVENT = 'code-rain-toggle';

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function subscribeEnabled(onChange: () => void) {
  window.addEventListener(TOGGLE_EVENT, onChange);
  return () => window.removeEventListener(TOGGLE_EVENT, onChange);
}

// Fallback for when localStorage is unavailable, so the toggle still works for this visit
let memoryEnabled = true;

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    // Storage can be unavailable (private mode, blocked site data)
    return memoryEnabled;
  }
}

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The server renders nothing (reduced motion assumed) so the rain only appears in the browser
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true
  );
  const enabled = useSyncExternalStore(subscribeEnabled, readEnabled, () => true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !enabled || reducedMotion) return;

    let width = 0;
    let height = 0;
    let drops: Drop[] = [];
    let color = '#0b6b60';
    let secondaryColor = '#0e7490';
    let alpha = 0.12;
    let font = `${FONT_SIZE}px monospace`;

    const readTheme = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      color = rootStyle.getPropertyValue('--accent').trim() || color;
      secondaryColor = rootStyle.getPropertyValue('--accent-2').trim() || secondaryColor;
      alpha = window.matchMedia('(prefers-color-scheme: dark)').matches ? 0.16 : 0.11;
      const mono = getComputedStyle(document.body).getPropertyValue('--font-geist-mono').trim();
      font = `${FONT_SIZE}px ${mono ? `${mono}, ` : ''}monospace`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Sparse on purpose: about one drop per 70px of width
      const count = Math.max(8, Math.round(width / 70));
      drops = Array.from({ length: count }, () => makeDrop(width, height));
    };

    const iconPaths = ICONS.map(({ path }) => new Path2D(path));

    readTheme();
    resize();

    let frame = 0;
    let last = 0;
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (time - last < FRAME_MS) return;
      last = time;

      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textBaseline = 'top';
      ctx.lineWidth = 1.75;

      drops.forEach((drop, i) => {
        const fill = drop.secondary ? secondaryColor : color;
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;

        if (drop.icon !== undefined) {
          // Icons are single shapes, so draw them a little stronger than one faded glyph
          ctx.globalAlpha = alpha * 1.4;
          ctx.save();
          ctx.translate(drop.x + ICON_SIZE / 2, drop.y + ICON_SIZE / 2);
          ctx.rotate(drop.rotation);
          ctx.scale(ICON_SIZE / 24, ICON_SIZE / 24);
          ctx.translate(-12, -12);
          if (ICONS[drop.icon].stroke) ctx.stroke(iconPaths[drop.icon]);
          else ctx.fill(iconPaths[drop.icon], 'evenodd');
          ctx.restore();
          drop.rotation += drop.spin;
        }

        drop.chars.forEach((char, j) => {
          // The head (last char) is brightest and the tail fades out above it
          const fade = (j + 1) / drop.chars.length;
          ctx.globalAlpha = alpha * fade;
          ctx.fillText(char, drop.x, drop.y + j * (FONT_SIZE + 3));
        });
        // Flicker one glyph now and then, like characters being rewritten
        if (drop.chars.length > 1 && Math.random() < 0.05) {
          drop.chars[Math.floor(Math.random() * drop.chars.length)] = pick(GLYPHS);
        }
        drop.y += drop.speed;
        if (drop.y > height) drops[i] = makeDrop(width, height, true);
      });
      ctx.globalAlpha = 1;
    };
    frame = requestAnimationFrame(draw);

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    colorScheme.addEventListener('change', readTheme);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      colorScheme.removeEventListener('change', readTheme);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [enabled, reducedMotion]);

  const toggle = () => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'off' : 'on');
    } catch {
      memoryEnabled = !enabled;
    }
    window.dispatchEvent(new Event(TOGGLE_EVENT));
  };

  if (reducedMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn('pointer-events-none fixed inset-0 -z-10 h-full w-full print:hidden', !enabled && 'hidden')}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        title={enabled ? 'Turn off the code rain' : 'Turn on the code rain'}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-20 rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-xs text-muted shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent print:hidden"
      >
        {enabled ? 'rain.stop()' : 'rain.start()'}
      </button>
    </>
  );
}
