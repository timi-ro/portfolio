export default function AsymmetricBlob() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 600 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="asymmetricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="1" />
          <stop offset="40%" stopColor="#0891B2" stopOpacity="1" />
          <stop offset="100%" stopColor="#0E7490" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="asymmetricGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Layer 1: Largest asymmetric blob - back layer */}
      <path
        d="M 320 50 C 450 30, 520 80, 540 180 C 560 280, 550 400, 500 500 C 450 600, 350 650, 250 640 C 150 630, 80 580, 50 480 C 20 380, 30 280, 80 180 C 130 80, 200 70, 320 50 Z"
        fill="url(#asymmetricGradient)"
        opacity="0.15"
      />

      {/* Layer 2: Medium blob - offset for depth */}
      <path
        d="M 300 80 C 420 50, 480 120, 500 200 C 530 300, 510 420, 460 510 C 400 600, 300 620, 200 600 C 120 580, 70 520, 60 420 C 50 320, 80 220, 140 140 C 200 60, 260 70, 300 80 Z"
        fill="url(#asymmetricGradient)"
        opacity="0.25"
      />

      {/* Layer 3: Main asymmetric shape */}
      <path
        d="M 280 100 C 380 70, 450 130, 470 220 C 500 330, 480 450, 420 530 C 360 610, 260 630, 180 600 C 100 570, 60 500, 70 400 C 80 300, 120 200, 180 140 C 240 80, 280 90, 280 100 Z"
        fill="url(#asymmetricGradient)"
      />

      {/* Layer 4: Accent shape */}
      <path
        d="M 350 150 C 420 140, 460 200, 470 280 C 480 360, 460 440, 410 500 C 360 560, 280 580, 220 550 C 160 520, 140 460, 150 380 C 160 300, 200 240, 260 190 C 320 140, 350 145, 350 150 Z"
        fill="url(#asymmetricGradient2)"
      />

      {/* Decorative line art */}
      <ellipse
        cx="280"
        cy="350"
        rx="280"
        ry="320"
        stroke="#06B6D4"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        strokeDasharray="8 12"
      />

      {/* Corner accents */}
      <g stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.4">
        <line x1="500" y1="100" x2="550" y2="100"/>
        <line x1="550" y1="100" x2="550" y2="150"/>
        <line x1="50" y1="550" x2="0" y2="550"/>
        <line x1="0" y1="550" x2="0" y2="500"/>
      </g>

      {/* Decorative circles */}
      <circle cx="520" cy="180" r="8" fill="#06B6D4" opacity="0.6"/>
      <circle cx="540" cy="220" r="4" fill="#14B8A6" opacity="0.4"/>
      <circle cx="60" cy="480" r="6" fill="#06B6D4" opacity="0.5"/>
      <circle cx="40" cy="520" r="3" fill="#14B8A6" opacity="0.3"/>

      {/* Curved accent lines */}
      <g stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.2">
        <path d="M 450 400 Q 480 450, 460 500" />
        <path d="M 100 200 Q 70 250, 90 300" />
      </g>
    </svg>
  );
}