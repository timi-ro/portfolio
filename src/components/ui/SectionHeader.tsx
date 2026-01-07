import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  className?: string;
}

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-[10px] tracking-[0.4em] text-cyan-500 uppercase', className)}>
      {label}
    </div>
  );
}