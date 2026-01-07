export function SectionLoader() {
  return (
    <div className="relative bg-[#0A0A0F] py-32 flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated loading circles */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-zinc-600 text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}