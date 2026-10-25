import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { BlackCat } from '@/components/ui/BlackCat';

// Tiny hand-rolled syntax highlighting for the code block below
const Key = ({ children }: { children: React.ReactNode }) => <span className="text-ink">{children}</span>;
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-amber-700 dark:text-amber-300">&apos;{children}&apos;</span>
);
const Lit = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent-2">{children}</span>
);
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="italic text-subtle">{`// ${children}`}</span>
);
const P = ({ children }: { children: React.ReactNode }) => <span className="text-subtle">{children}</span>;

export default function OffTheClock() {
  return (
    <section id="off-the-clock" aria-label="Off the clock" className="scroll-mt-16 pt-24">
      <SectionHeading>Off the clock</SectionHeading>

      <Reveal>
        <p className="text-[17px] leading-relaxed text-muted">
          Most of me doesn&apos;t fit on a résumé. Here&apos;s a partial listing; the rest is on a need-to-know basis.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-16">
        <BlackCat className="absolute -top-10.5 right-10 h-11 w-11" />

        <figure className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
          <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-subtle">about-me.ts</span>
          </figcaption>

          <div className="overflow-x-auto">
            <pre className="px-5 py-5 font-mono text-[13px] leading-7 text-muted sm:text-sm sm:leading-7">
              <code>
                <Comment>the parts that don&apos;t fit on a résumé</Comment>
                {'\n'}
                <span className="text-accent">const</span> <Key>fatemeh</Key> <P>=</P> <P>{'{'}</P>
                {'\n  '}
                <Key>energy</Key>
                <P>:</P> <Str>black cat</Str>
                <P>,</P> <Comment>independent, observant, selective with attention</Comment>
                {'\n  '}
                <Key>trains</Key>
                <P>:</P> <Str>strength</Str>
                <P>,</P> <Comment>progressive overload works on code too</Comment>
                {'\n  '}
                <Key>plays</Key>
                <P>:</P> <Str>video games</Str>
                <P>,</P> <Comment>Call of Duty, Mortal Kombat</Comment>
                {'\n  '}
                <Key>rides</Key>
                <P>:</P> <Str>skateboard</Str>
                <P>,</P> <Comment>gravity is more of a suggestion</Comment>
                {'\n  '}
                <Key>writes</Key>
                <P>: [</P>
                <Str>journal</Str>
                <P>,</P> <Str>poetry</Str>
                <P>],</P> <Comment>contents classified</Comment>
                {'\n  '}
                <Key>studies</Key>
                <P>: [</P>
                <Str>philosophy</Str>
                <P>,</P> <Str>psychology</Str>
                <P>],</P> <Comment>what my analytical mind feeds on</Comment>
                {'\n  '}
                <Key>overthinks</Key>
                <P>:</P> <Lit>Infinity</Lit>
                <P>,</P> <Comment>a feature, not a bug</Comment>
                {'\n'}
                <P>{'};'}</P>
                {'\n\n'}
                <Comment>common thread: complex systems. Software, strength, the mind.</Comment>
              </code>
            </pre>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
