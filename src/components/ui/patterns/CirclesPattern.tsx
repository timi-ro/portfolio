interface CirclesPatternProps {
  size?: number;
  className?: string;
  opacity?: number;
  rings?: number[];
}

export function CirclesPattern({
  size = 200,
  className = '',
  opacity = 0.15,
  rings = [80, 60, 40]
}: CirclesPatternProps) {
  const center = size / 2;

  return (
    <div className={`absolute ${className}`} style={{ opacity }}>
      <svg width={size} height={size}>
        {rings.map((radius, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius}
            stroke="#06B6D4"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}