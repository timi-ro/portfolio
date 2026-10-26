import { BLACK_CAT } from '@/components/catArt';
import { NeonCat } from '@/components/NeonCat';
import { cn } from '@/lib/utils';

interface BlackCatProps {
  className?: string;
}

// Drawn at the same scale as the cats on the sidebar divider, so the glow matches theirs.
// That puts the ledge it sits on (y = 400 in the art) 48px from the top.
const SCALE = 0.12;

// A black cat in the same neon line art as the cats on the divider, with a blinking eye and a
// tail that sways over the edge it sits on (animations in globals.css)
export function BlackCat({ className }: BlackCatProps) {
  const [width, height] = BLACK_CAT.viewBox;
  return (
    <div className={cn('pointer-events-none', className)} style={{ width: width * SCALE, height: height * SCALE }}>
      <NeonCat art={BLACK_CAT} glowId="cat-glow-black" lineClass="stroke-cat-black" eyeClass="fill-cat-black-eye" />
    </div>
  );
}
