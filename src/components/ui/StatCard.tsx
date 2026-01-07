interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <div className="text-3xl lg:text-4xl font-light text-white mb-2">{value}</div>
      <div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">{label}</div>
    </div>
  );
}