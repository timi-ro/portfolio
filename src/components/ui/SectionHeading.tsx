interface SectionHeadingProps {
  children: React.ReactNode;
}

// Sticky on small screens, where there is no sidebar nav to show the current section
export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="sticky top-0 z-10 -mx-6 mb-8 bg-paper/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-10 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <h2 className="font-serif text-3xl font-normal tracking-tight text-ink">
        {children}
        <span className="text-accent-2">.</span>
      </h2>
    </div>
  );
}
