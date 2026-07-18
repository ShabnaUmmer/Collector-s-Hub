import { useState } from 'react';
import { MdBrokenImage } from 'react-icons/md';

export default function Img({ src, alt, className, style }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`img-fallback ${className || ''}`} style={style}>
        <MdBrokenImage size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={style}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
