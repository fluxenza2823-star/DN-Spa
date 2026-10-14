import { useState } from 'react';
import { Leaf } from 'lucide-react';

// Image with a graceful gradient fallback if the file is missing or fails to load.
export default function SafeImage({ src, alt, eager = false, className = '', width, height }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <Leaf size={48} aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  );
}
