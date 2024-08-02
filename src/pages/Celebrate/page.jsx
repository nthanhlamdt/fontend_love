import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import 'tailwindcss/tailwind.css';

const SpecialMemories = () => {
  const [anniversaries, setAnniversaries] = useState([
    { id: 1, title: 'Ngày gặp nhau', date: '2024-12-25' },
    { id: 2, title: 'Ngày yêu nhau', date: '2025-01-01' },
    { id: 3, title: 'Ngày hẹn hò đầu tiên', date: '2025-02-14' },
  ]);
  
  // Sort anniversaries by date
  anniversaries.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find the next anniversary
  const now = new Date();
  const nextAnniversary = anniversaries.find(
    (anniversary) => new Date(anniversary.date) > now
  );

  const [videoUrl, setVideoUrl] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto p-8 bg-pink-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-12 text-pink-600">Kỷ Niệm Đặc Biệt</h1>
      
      {/* Countdown Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-pink-800">Kỷ Niệm Sắp Tới</h2>
        {nextAnniversary && (
          <div className="bg-pink-100 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold text-center mb-2 text-pink-700">{nextAnniversary.title}</h3>
            <div className="text-center text-pink-500">
              <Countdown date={new Date(nextAnniversary.date)} />
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setShowAll(!showAll)} 
          className="bg-pink-200 text-pink-800 font-semibold py-2 px-4 rounded-full hover:bg-pink-300 transition duration-300">
          {showAll ? 'Ẩn Các Kỷ Niệm Khác' : 'Hiển Thị Tất Cả Kỷ Niệm'}
        </button>

        {showAll && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-pink-800">Tất Cả Kỷ Niệm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {anniversaries.map((anniversary) => (
                <div key={anniversary.id} className="bg-pink-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-center mb-2 text-pink-700">{anniversary.title}</h3>
                  <div className="text-center text-pink-500">
                    <Countdown date={new Date(anniversary.date)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-pink-800">Tạo Video Kỷ Niệm</h2>
        <div className="mb-6">
          <input 
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-100 file:text-pink-600
            hover:file:bg-pink-200
          " />
        </div>
        {videoUrl && (
          <div className="relative pb-9/16 h-0 overflow-hidden max-w-full w-full mb-6 rounded-lg shadow-lg">
            <video src={videoUrl} controls className="absolute top-0 left-0 w-full h-full rounded-lg"></video>
          </div>
        )}
        <textarea
          className="w-full p-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          placeholder="Thêm văn bản hoặc chú thích cho video..."
          rows="3"
        />
      </div>
    </div>
  );
};

export default SpecialMemories;
