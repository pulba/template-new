import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  data: {
    title: string;
    image: string;
    date: Date;
    caption?: string;
  };
}

interface GalleryCarouselProps {
  items: GalleryItem[];
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (items.length === 0) return null;

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-[3rem] shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-[500px] md:h-[700px]" key={item.id}>
              <img
                src={item.data.image}
                alt={item.data.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8 md:p-20">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="max-w-3xl text-white"
                    >
                      <div className="flex items-center gap-3 text-sm font-bold text-stone-300 uppercase tracking-widest mb-6">
                        <div className="w-12 h-0.5 bg-stone-500"></div>
                        <Calendar size={16} />
                        {item.data.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        {item.data.title}
                      </h2>
                      {item.data.caption && (
                        <p className="text-stone-300 text-xl leading-relaxed line-clamp-2 max-w-2xl">
                          {item.data.caption}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={scrollPrev}
          className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto shadow-2xl"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={scrollNext}
          className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto shadow-2xl"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              selectedIndex === index ? 'w-12 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
