import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

// Giả lập danh sách công thức và thử thách nấu ăn
const initialRecipes = [
  {
    id: 1,
    title: 'Món Bún Chả Hà Nội',
    description: 'Một món ăn truyền thống của Việt Nam với bún, thịt nướng, và nước chấm.',
    imageUrl: 'https://example.com/bun-cha.jpg',
    steps: [
      'Chuẩn bị nguyên liệu.',
      'Ướp thịt với gia vị.',
      'Nướng thịt trên than hồng.',
      'Nấu nước dùng.',
      'Xếp bún, thịt và rau vào bát, thêm nước dùng.',
    ],
  },
  {
    id: 2,
    title: 'Pizza Margherita',
    description: 'Pizza với sốt cà chua, mozzarella và basil.',
    imageUrl: 'https://example.com/pizza.jpg',
    steps: [
      'Chuẩn bị bột pizza.',
      'Làm sốt cà chua.',
      'Xếp mozzarella lên bột pizza.',
      'Nướng pizza trong lò.',
      'Thêm basil và phục vụ.',
    ],
  },
];

const CookingChallenge = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [challenge, setChallenge] = useState('Nấu một món ăn mới hôm nay');
  const [proofUrl, setProofUrl] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', imageUrl: '' });
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  useEffect(() => {
    // Giả lập việc lấy thử thách nấu ăn hàng ngày từ server
    const dailyChallenge = "Nấu một món ăn mới hôm nay";
    setChallenge(dailyChallenge);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProofUrl(url);
    }
  };

  const handleAddRecipe = () => {
    if (newRecipe.title && newRecipe.description && newRecipe.imageUrl) {
      setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
      setNewRecipe({ title: '', description: '', imageUrl: '' });
    }
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };

  const openChallengeModal = () => {
    setShowChallengeModal(true);
  };

  const closeChallengeModal = () => {
    setShowChallengeModal(false);
  };

  return (
    <div className="container mx-auto p-8 bg-pink-50 rounded-lg shadow-xl">
      <h1 className="text-5xl font-bold text-center mb-12 text-pink-700">Chia Sẻ Công Thức Nấu Ăn & Thử Thách Nấu Ăn</h1>

      {/* Phần chọn món ăn và hiển thị bước nấu ăn */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Công Thức Nấu Ăn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 cursor-pointer hover:bg-pink-200 transition"
              onClick={() => openRecipeModal(recipe)}
            >
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2 text-pink-600">{recipe.title}</h3>
              <p className="text-pink-700">{recipe.description}</p>
            </div>
          ))}
        </div>

        {/* Modal công thức nấu ăn */}
        {showRecipeModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
              <button onClick={closeRecipeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedRecipe && (
                <>
                  <h2 className="text-4xl font-bold mb-4 text-pink-800">{selectedRecipe.title}</h2>
                  <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <p className="text-pink-700 mb-4">{selectedRecipe.description}</p>
                  <h3 className="text-2xl font-semibold mb-2 text-pink-800">Các Bước Nấu Ăn</h3>
                  <ul className="list-disc list-inside text-pink-700">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phần thêm công thức và thử thách nấu ăn */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Thêm Công Thức</h2>
        <div className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 mb-12">
          <input
            type="text"
            placeholder="Tiêu đề công thức"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            className="w-full p-2 mb-4 border border-pink-300 rounded"
          />
          <textarea
            placeholder="Mô tả công thức"
            value={newRecipe.description}
            onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
            className="w-full p-2 mb-4 border border-pink-300 rounded"
          />
          <input
            type="text"
            placeholder="URL hình ảnh"
            value={newRecipe.imageUrl}
            onChange={(e) => setNewRecipe({ ...newRecipe, imageUrl: e.target.value })}
            className="w-full p-2 mb-4 border border-pink-300 rounded"
          />
          <button
            onClick={handleAddRecipe}
            className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600"
          >
            Thêm Công Thức
          </button>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Thử Thách Nấu Ăn</h2>
        <div className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 mb-6">
          <p className="text-pink-700 text-lg mb-4">Thử thách hôm nay: {challenge}</p>
          <button onClick={openChallengeModal} className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600">
            Tải Bằng Chứng
          </button>
          {proofUrl && (
            <div className="mt-4">
              <img src={proofUrl} alt="Proof" className="max-w-xs mx-auto h-auto rounded-lg shadow-md"/>
            </div>
          )}
        </div>

        {/* Modal thử thách nấu ăn */}
        {showChallengeModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
              <button onClick={closeChallengeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl font-semibold mb-4 text-pink-800">Thử Thách Nấu Ăn</h2>
              <p className="text-pink-700 text-lg mb-4">Thử thách hôm nay: {challenge}</p>
              <label htmlFor="proof-upload" className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-pink-600 transition duration-300">
                Tải Bằng Chứng
                <input type="file" id="proof-upload" accept="image/*,video/*" onChange={handleFileUpload} className="hidden"/>
              </label>
              {proofUrl && (
                <div className="mt-4">
                  <img src={proofUrl} alt="Proof" className="max-w-xs mx-auto h-auto rounded-lg shadow-md"/>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookingChallenge;
