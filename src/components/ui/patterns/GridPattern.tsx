interface GridPatternProps {
  className?: string;
  opacity?: number;
  gridSize?: number;
}

export function GridPattern({
  className = '',
  opacity = 0.4,
  gridSize = 60
}: GridPatternProps) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%">
        <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  );
}