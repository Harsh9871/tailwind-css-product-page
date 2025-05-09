import { useState, useRef, useEffect } from 'react';

export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const zoomRef = useRef(null);
  const zoomDelayRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!zoomRef.current || !isZooming) return;

    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleMouseEnter = () => {
    zoomDelayRef.current = setTimeout(() => {
      setIsZooming(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(zoomDelayRef.current);
    setIsZooming(false);
  };

  useEffect(() => {
    return () => clearTimeout(zoomDelayRef.current);
  }, []);

  return (
    <div className="relative max-w-[450px] mx-auto">
      {/* Main image with zoom */}
      <div
        className="relative overflow-hidden rounded-md bg-gray-100 mb-2 aspect-square"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={zoomRef}
      >
        <div className="relative w-full h-full hover:cursor-zoom-in">
          {/* Base image */}
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="w-full h-full object-cover object-center transition-all duration-300 ease-out"
          />

          {/* Zoom overlay */}
          {isZooming && (
            <div 
              className="absolute inset-0 pointer-events-none bg-no-repeat"
              style={{
                backgroundImage: `url(${images[activeIndex].url})`,
                backgroundSize: '150%',
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                opacity: 1,
                transition: 'background-position 0.1s ease-out'
              }}
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">Bestseller</span>
          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">New Formula</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsZooming(false);
              clearTimeout(zoomDelayRef.current);
            }}
            className={`border rounded overflow-hidden aspect-square transition-all ${
              index === activeIndex ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>
    </div>
  );
}