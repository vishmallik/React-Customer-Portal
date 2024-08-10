import Skeleton from "react-loading-skeleton";

import { getImageUrl } from "../utils/url";
import { useEffect, useState } from "react";
type Photo = {
  id: number;
  src: string;
};

function calculateImageWidth() {
  if (window.innerWidth <= 640) return 500;
  if (window.innerWidth <= 768) return 300;
  if (window.innerWidth <= 1024) return 250;
  if (window.innerWidth <= 1280) return 250;
  if (window.innerWidth <= 1536) return 280;
  return 350;
}
export default function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchPhotos = () => {
      const imageArr = [];
      const width = calculateImageWidth();
      for (let i = 0; i < 9; i++) {
        imageArr.push({
          id: i,
          src: getImageUrl(width, 250),
        });
      }
      setPhotos(imageArr);
    };

    fetchPhotos(); // Initial fetch

    const intervalId = setInterval(() => {
      setLoadedImages({});
      setErrorImages({});
      fetchPhotos();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };
  const handleImageError = (id: number) => {
    setErrorImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {photos &&
        photos.map((photo) => (
          <div
            className="2xl:w-80 xl:w-60 lg:w-48 h-52 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            key={photo.id}
          >
            {!loadedImages[photo.id] && !errorImages[photo.id] && (
              <Skeleton
                width={"100%"}
                height={"100%"}
                className="rounded-xl bg-0"
                enableAnimation
              />
            )}
            {errorImages[photo.id] ? (
              <div className="flex items-center justify-center h-full w-full bg-red-200 rounded-xl space-x-2">
                <img src="/images/warning.png" alt="warning" className="w-4" />
                <p className="text-red-600 text-center">Image failed to load</p>
              </div>
            ) : (
              <img
                src={photo.src}
                alt={`Image-${photo.id}`}
                onLoad={() => handleImageLoad(photo.id)}
                onError={() => handleImageError(photo.id)}
                className={`rounded-xl h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
                  loadedImages[photo.id] ? "opacity-100" : "opacity-0"
                }`}
                style={{ display: loadedImages[photo.id] ? "block" : "none" }}
              />
            )}
          </div>
        ))}
    </div>
  );
}
