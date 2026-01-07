import { memo } from 'react';

interface SkillBadgeProps {
  skill: string;
}

export const SkillBadge = memo(function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div className="px-4 py-2 bg-[#111118] border border-zinc-800 text-xs text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 transition-colors">
      {skill}
    </div>
  );
});