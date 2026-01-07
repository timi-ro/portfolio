interface GeometricPatternProps {
  size?: number;
  className?: string;
  opacity?: number;
  rotation?: number;
}

export function GeometricPattern({
  size = 100,
  className = '',
  opacity = 0.1,
  rotation = 45
}: GeometricPatternProps) {
  const center = size / 2;

  return (
    <div className={`absolute ${className}`} style={{ opacity }}>
      <svg width={size} height={size}>
        <polygon
          points={`${center},0 ${size},87 0,87`}
          stroke="#06B6D4"
          strokeWidth="1"
          fill="none"
          transform={`rotate(${rotation} ${center} ${center})`}
        />
        <polygon
          points={`${center},20 ${center + 25},65 ${center - 25},65`}
          stroke="#06B6D4"
          strokeWidth="1"
          fill="none"
          transform={`rotate(${rotation} ${center} ${center})`}
        />
      </svg>
    </div>
  );
}