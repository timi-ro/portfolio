import { resume } from '@/data/resume';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line pt-8 text-sm text-subtle">
      <p>
        © {new Date().getFullYear()} {resume.personalInfo.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
