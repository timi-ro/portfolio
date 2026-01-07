import { memo } from 'react';

interface TechTagProps {
  tech: string;
}

export const TechTag = memo(function TechTag({ tech }: TechTagProps) {
  return (
    <div className="px-4 py-2 border border-zinc-800 text-[11px] text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-colors">
      {tech}
    </div>
  );
});