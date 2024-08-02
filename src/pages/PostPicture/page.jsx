import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const App = () => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  }, [webcamRef]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleUpload = () => {
    if (photo) {
      setCapturedPhotos([...capturedPhotos, { image: photo, caption }]);
      setPhoto(null);
      setCaption('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Chụp và Đăng Ảnh</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full max-w-lg">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={videoConstraints}
          className="rounded-lg"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={capture}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Chụp Ảnh
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Đăng Ảnh
          </button>
        </div>
        {photo && (
          <div className="mt-4">
            <img src={photo} alt="Captured" className="w-full max-w-sm rounded-lg border border-gray-300" />
            <textarea
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Nhập caption..."
              className="mt-2 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Ảnh Đã Đăng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capturedPhotos.map((photo, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <img src={photo.image} alt={`Captured ${index}`} className="w-full max-w-xs rounded-lg border border-gray-300" />
              <p className="mt-2 text-center text-gray-700">{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
