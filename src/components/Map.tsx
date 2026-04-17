import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number];
  zoom?: number;
  markerText?: string;
}

const Map: React.FC<MapProps> = ({ center, zoom = 15, markerText = "Lokasi Sekolah" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Fix for default icon issues in Leaflet with Vite/Webpack
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    mapInstance.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current);

    L.marker(center).addTo(mapInstance.current)
      .bindPopup(markerText)
      .openPopup();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [center, zoom, markerText]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-[3rem] shadow-inner bg-stone-100 dark:bg-stone-900 dark:brightness-75 dark:contrast-125 dark:invert-[.9] dark:hue-rotate-180"
      style={{ minHeight: '400px' }}
    />
  );
};

export default Map;
