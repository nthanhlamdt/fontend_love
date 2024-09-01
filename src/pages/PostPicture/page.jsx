import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { formatDistanceToNow } from 'date-fns';
import { useSwipeable } from 'react-swipeable';

export default function Component() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [viewIndex, setViewIndex] = useState(0);
  const photos = [
    {
      src: 'https://example.com/photo1.jpg',
      caption: 'Our first date',
      uploaderName: 'John Doe',
      uploadTime: '2024-08-10T12:34:56Z',
    },
    {
      src: 'https://example.com/photo2.jpg',
      caption: 'Anniversary trip',
      uploaderName: 'Jane Smith',
      uploadTime: '2024-07-25T08:22:30Z',
    },
    {
      src: 'https://example.com/photo3.jpg',
      caption: 'Proposal moment',
      uploaderName: 'Emily Davis',
      uploadTime: '2024-06-15T14:18:45Z',
    },
    {
      src: 'https://example.com/photo4.jpg',
      caption: 'Wedding day',
      uploaderName: 'Michael Johnson',
      uploadTime: '2024-05-02T16:45:30Z',
    },
  ];

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const handleSwipe = (direction) => {
    if (direction === 'Left') {
      setViewIndex((prevIndex) => (prevIndex + 1) % photos.length);
    } else if (direction === 'Right') {
      setViewIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (e) => handleSwipe(e.dir),
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow">
        <div className="bg-card shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8 mb-16">
          <h1 className="text-3xl font-bold mb-4 text-center text-card-foreground">
            Couples Gallery
          </h1>

          {/* WebCam */}
          {!photo ? (
            <div className="flex flex-col items-center mb-6">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="400"
                height="300"
                className="rounded-lg mb-4"
              />
              <button
                className="bg-pink-500 text-white rounded-lg py-2 px-4 hover:bg-pink-600"
                onClick={capture}
              >
                <CameraIcon className="h-5 w-5 inline-block mr-2" />
                Take Photo
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mb-6">
              <img
                src={photo}
                alt="Couple's Photo"
                width="400"
                height="300"
                className="rounded-lg mb-4"
                style={{ aspectRatio: '4/3', objectFit: 'cover' }}
              />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add caption..."
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 mb-4"
                  onClick={() => {
                    // Handle share functionality
                    alert('Photo shared with caption: ' + caption);
                  }}
                >
                  Share
                </button>
                <button
                  className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
                  onClick={() => setPhoto(null)}
                >
                  Retake
                </button>
              </div>
            </div>
          )}

          {/* Swipeable PhotoCard */}
          {photos.length > 0 && (
            <div
              className="flex flex-col items-center mb-6"
              {...swipeHandlers}
            >
              <PhotoCard 
                src={photos[viewIndex].src} 
                alt="Couple's Photo" 
                caption={photos[viewIndex].caption} 
                uploaderName={photos[viewIndex].uploaderName} 
                uploadTime={photos[viewIndex].uploadTime} 
              />
            </div>
          )}
        </div>
      </div>
      <footer className="bg-footer p-4 text-center">
        {/* Footer content */}
      </footer>
    </div>
  );
}

function PhotoCard({ src, alt, caption, uploaderName, uploadTime }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 mb-2">{caption}</p>
        <div className="text-sm text-gray-600 mb-1">Uploaded by: {uploaderName}</div>
        <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(uploadTime), { addSuffix: true })}</div>
      </div>
    </div>
  );
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
