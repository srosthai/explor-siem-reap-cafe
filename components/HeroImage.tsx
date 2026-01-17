import Image from 'next/image';
import { Badge } from './ui/Badge';

interface HeroImageProps {
  src: string;
  alt: string;
  name: string;
  area: string;
}

export function HeroImage({ src, alt, name, area }: HeroImageProps) {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] -mx-4 sm:-mx-6 lg:mx-0 lg:rounded-3xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="image-overlay absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <Badge variant="area" className="mb-3">
          {area}
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          {name}
        </h1>
      </div>
    </div>
  );
}
