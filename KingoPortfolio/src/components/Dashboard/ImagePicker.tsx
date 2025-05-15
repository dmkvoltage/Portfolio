import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Loader } from 'lucide-react';
import { listFiles } from '../../utils/googleDrive';
import Button from '../UI/Button';

interface ImagePickerProps {
  onSelect: (url: string) => void;
  currentImage?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onSelect, currentImage }) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const files = await listFiles();
      setImages(files || []);
      setError(null);
    } catch (err) {
      setError('Failed to load images from Google Drive');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Image</h3>
        <Button
          variant="outline"
          onClick={loadImages}
          disabled={loading}
          icon={loading ? <Loader className="animate-spin" /> : <ImageIcon />}
        >
          Refresh
        </Button>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              currentImage === image.webViewLink
                ? 'border-blue-600 shadow-lg'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
            }`}
            onClick={() => onSelect(image.webViewLink)}
          >
            <img
              src={image.thumbnailLink}
              alt={image.name}
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <p className="text-white text-sm truncate">{image.name}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-blue-600" />
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No images found in Google Drive
        </div>
      )}
    </div>
  );
};

export default ImagePicker;