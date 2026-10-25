import { resume } from '@/data/resume';
import Navigation from '@/components/Navigation';
import { SocialLinks } from '@/components/ui/SocialLinks';

// The divider between the sidebar and the content: a wavy line the cats walk along.
function TailDivider() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -right-3 top-0 hidden h-full w-6 lg:block"
    >
      <path
        d="M12 0C18 80 6 160 12 240S18 400 12 480 6 640 12 720 18 860 12 930L12 1000"
        fill="none"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        className="stroke-line"
      />
    </svg>
  );
}

export default function Sidebar() {
  const { name, role, intro, location, email, linkedin, github, medium } = resume.personalInfo;
  const current = resume.experience.find((exp) => exp.period.endsWith('Present'));

  return (
    <header id="sidebar" className="pt-16 pb-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[30%] lg:max-w-md lg:shrink-0 lg:flex-col lg:justify-between lg:py-24 lg:pr-12">
      <div>
        <h1 className="font-serif text-5xl font-normal tracking-tight text-ink sm:text-6xl">
          <a href="#">{name}</a>
        </h1>
        <p className="mt-4 text-lg font-medium text-ink">{role}</p>
        {current && (
          <p className="mt-1 text-[15px] text-muted">
            Currently at{' '}
            <a
              href={current.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline underline-offset-4"
            >
              {current.company}
            </a>
          </p>
        )}
        <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">{intro}</p>

        <Navigation />
      </div>

      <div className="mt-10 space-y-5 lg:mt-0">
        <SocialLinks linkedin={linkedin} github={github} medium={medium} email={email} />
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">
          {location} · Remote
        </p>
      </div>

      <TailDivider />
    </header>
  );
}
