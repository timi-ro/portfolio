'use client';

import { useEffect, useRef, useState } from 'react';
import { resume } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const experiences = resume.experience;
const lastIndex = experiences.length - 1;

const itemId = (company: string) => `role-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

// Rail geometry, shared by the line and the dots so they always line up:
// mobile puts the rail in a 1.5rem column on the left; from sm up it sits
// between the content and the 8.5rem dates column (with 1.5rem gaps)
const railPosition = 'left-3 sm:left-auto sm:right-[calc(10.75rem-0.5px)]';

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Roles start visible (so the page works without JS) and are hidden only once the
  // observer reports them off-screen, then revealed when scrolled into view
  const [hidden, setHidden] = useState<Set<number>>(new Set());
  // How many dots the scroll-linked line has passed; the last one passed is the active role
  const [passed, setPassed] = useState(0);
  const active = Math.max(passed - 1, 0);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setHidden((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
            revealObserver.unobserve(entry.target);
          } else {
            setHidden((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    itemRefs.current.forEach((item) => item && revealObserver.observe(item));

    // Grow the accent line to the middle of the viewport, and light up every dot it reaches
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list || !fillRef.current) return;
      const listTop = list.getBoundingClientRect().top;
      const progress = Math.min(Math.max(window.innerHeight * 0.5 - listTop, 0), list.offsetHeight);
      fillRef.current.style.height = `${progress}px`;
      const count = itemRefs.current.filter((item) => item && item.offsetTop + 12 <= progress).length;
      setPassed(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const target = itemRefs.current[index];
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    // Keep keyboard users on the timeline so they can keep stepping through it
    dotRefs.current[index]?.focus({ preventScroll: true });
  };

  return (
    <section id="experience" aria-label="Experience" className="scroll-mt-16 pt-24">
      <SectionHeading>Experience</SectionHeading>

      <ol ref={listRef} className="relative">
        {/* One continuous rail behind all the dots: grey track, plus an accent fill that follows the scroll */}
        <span
          aria-hidden="true"
          className={cn('absolute bottom-0 top-3 w-px bg-linear-to-b from-line from-85% to-transparent', railPosition)}
        />
        <span
          ref={fillRef}
          aria-hidden="true"
          className={cn('absolute top-3 h-0 w-px bg-linear-to-b from-accent from-85% to-accent/0', railPosition)}
        />

        {experiences.map((exp, index) => {
          const [start, end] = exp.period.split(' – ');
          const [startMonth, startYear] = start.split(' ');
          const isCurrent = end === 'Present';
          const isRevealed = !hidden.has(index);
          const isActive = active === index;
          const isPassed = index < passed;
          const nextIndex = index === lastIndex ? 0 : index + 1;
          const nextLabel =
            index === lastIndex ? `Back to ${experiences[0].company}` : `Next: ${experiences[nextIndex].company}`;

          return (
            <li
              key={exp.company}
              id={itemId(exp.company)}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative grid scroll-mt-24 grid-cols-[1.5rem_1fr] gap-x-5 pb-14 sm:grid-cols-[1fr_1.5rem_8.5rem] sm:gap-x-6 lg:scroll-mt-12"
            >
              {/* Dot: left of the content on mobile, right of it from sm up */}
              <div className="relative col-start-1 row-span-2 row-start-1 sm:col-start-2 sm:row-span-1">
                <button
                  type="button"
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  onClick={() => goTo(nextIndex)}
                  aria-label={`${exp.company}. ${nextLabel}`}
                  className="group absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute h-3 w-3 animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative h-3 w-3 rounded-full border-2 transition-all duration-300 group-hover:scale-125 motion-reduce:transition-none',
                      // Only current roles are solid; the role being read gets a ring instead
                      isCurrent ? 'border-accent bg-accent' : 'bg-paper',
                      !isCurrent && (isPassed ? 'border-accent' : 'border-subtle'),
                      isActive && 'scale-125 ring-4 ring-accent-soft'
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
                  >
                    {nextLabel} {index === lastIndex ? '↑' : '↓'}
                  </span>
                </button>
              </div>

              {/* Dates: above the content on mobile, right of the rail from sm up */}
              <div
                className={cn(
                  'col-start-2 pb-3 transition-all duration-700 ease-out motion-reduce:transition-none sm:col-start-3 sm:row-start-1 sm:pb-0',
                  isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
                )}
              >
                <p
                  className={cn(
                    'font-serif text-4xl leading-none tracking-tight transition-colors duration-500 sm:-mt-1 sm:text-5xl',
                    isActive ? 'bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent' : 'text-subtle/35'
                  )}
                >
                  {startYear}
                </p>
                <p className="mt-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-wide text-subtle">
                  {startMonth} {startYear} <span aria-hidden="true">→</span>
                  <span className="sr-only">to</span>{' '}
                  <span className={isCurrent ? 'text-accent' : undefined}>{end}</span>
                </p>
                {isCurrent ? (
                  <span className="mt-2 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                    Current
                  </span>
                ) : (
                  exp.tenure && (
                    <span className="mt-2 inline-block rounded-full border border-line px-2 py-0.5 text-[10px] text-subtle">
                      {exp.tenure}
                    </span>
                  )
                )}
              </div>

              <div
                className={cn(
                  'col-start-2 transition-all duration-700 ease-out motion-reduce:transition-none sm:col-start-1 sm:row-start-1',
                  isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                )}
              >
                <h3 className="text-lg font-medium leading-snug text-ink">
                  {exp.role}
                  <span className="text-subtle"> · </span>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline underline-offset-4"
                    >
                      {exp.company}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className="mt-1 text-sm text-subtle">
                  {[exp.context, exp.location].filter(Boolean).join(' · ')}
                </p>

                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="relative pl-5">
                      <span className="absolute left-0.5 top-[0.68em] h-1 w-1 rounded-full bg-subtle" aria-hidden="true" />
                      {typeof achievement === 'string' ? (
                        achievement
                      ) : (
                        <>
                          <span className="font-medium text-ink">{achievement.title}</span>{' '}
                          {achievement.detail}
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {exp.technologies.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                    {exp.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}

        {/* Where the line ends: a nod to the very first program */}
        <li
          aria-hidden="true"
          className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 sm:grid-cols-[1fr_1.5rem_8.5rem] sm:gap-x-6"
        >
          <div className="relative col-start-1 row-start-1 h-6 sm:col-start-2">
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-subtle bg-paper" />
          </div>
          <p className="col-start-2 row-start-1 self-center font-mono text-xs text-subtle sm:col-start-3">
            hello, world
            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent motion-reduce:animate-none" />
          </p>
        </li>
      </ol>
    </section>
  );
}
