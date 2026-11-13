import Image from "next/image";
import Link from "next/link";

type Props = { variant?: "color" | "white"; className?: string; height?: number };

// Aspect ratio of the horizontal logo SVG (width / height).
const RATIO = 380 / 64;

export default function Logo({ variant = "color", height = 36, className }: Props) {
  const src = variant === "white" ? "/brand/logo-horizontal-white.svg" : "/brand/logo-horizontal.svg";
  return (
    <Link href="/" aria-label="InternetNearby home" className={className}>
      <Image src={src} alt="InternetNearby" width={Math.round(height * RATIO)} height={height} className="max-w-none" priority unoptimized />
    </Link>
  );
}
