interface DotsPatternProps {
  className?: string;
  opacity?: number;
}

export function DotsPattern({ className = '', opacity = 0.2 }: DotsPatternProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg width="100%" height="100%">
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#06B6D4" opacity={opacity}/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
    </div>
  );
}