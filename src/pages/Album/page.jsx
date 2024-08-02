import { useState } from 'react'
import 'tailwindcss/tailwind.css'

const initialAlbums = [
  {
    id: 1,
    title: 'Chuyến Đi Đà Nẵng',
    description: 'Album lưu giữ những kỷ niệm đáng nhớ tại Đà Nẵng.',
    photos: [
      {
        id: 1,
        url: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/428612755_411073891393500_5432439734118428374_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=5QF49vfGiAUQ7kNvgGkj8iW&_nc_ht=scontent.fdad3-4.fna&gid=AGBcT2t-UQlTV-UrwmHWuYY&oh=00_AYAOFrO7SfCFgtFiZQbotlPj1YO9JdIGThfb0B6no5WYJA&oe=66B0F2F6',
        caption: 'Bãi biển Mỹ Khê'
      },
      {
        id: 2,
        url: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/428604483_1637629533435663_4113908433328337219_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH3ec7EtzPl46ErSD0r-re2hp7d0zf9zTyGnt3TN_3NPLe4B8G6nGWZegUZl5k5jaYtShIZAiJRjk0RvJaab-Xd&_nc_ohc=l3TOoN5GmM8Q7kNvgHu-OkO&_nc_ht=scontent.fdad3-4.fna&oh=00_AYB4hPROc0Ig9Eenv204U0tVMtHdWItwyUX5WgvMYOKEVg&oe=66B12356',
        caption: 'Cầu Rồng'
      },
      {
        id: 3,
        url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/449847305_1719991785199437_1181917033287494810_n.jpg?stp=dst-jpg_s600x600&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGFjx74bMZ0cxLHy1XFdXur5cYu6IJ4VTDlxi7ognhVMKtVg8aIVis_9OxphlP6Oo8aMjqgXBrk5pco_gCYYb2T&_nc_ohc=XsNY45yehzUQ7kNvgE9aZjp&_nc_ht=scontent.fdad3-5.fna&gid=A4viUYe9XZv_h-eUuUGU8mj&oh=00_AYDKYszZgGMa8UoBtmURp55NwMbQObZwwp8hWAIR7ZZwmQ&oe=66B11C59',
        caption: 'Bảo tàng Chăm'
      }
    ]
  }
]

const MemoryAlbum = () => {
  const [albums, setAlbums] = useState(initialAlbums)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '' })
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' })
  const [photoFile, setPhotoFile] = useState(null)

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album)
  }

  const handleCloseModal = () => {
    setSelectedAlbum(null)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotoFile(url)
      setNewPhoto({ ...newPhoto, url })
    }
  }

  const handleAddPhoto = () => {
    if (newPhoto.url && newPhoto.caption) {
      const updatedAlbum = {
        ...selectedAlbum,
        photos: [...selectedAlbum.photos, { ...newPhoto, id: selectedAlbum.photos.length + 1 }]
      }
      setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
      setSelectedAlbum(updatedAlbum)
      setNewPhoto({ url: '', caption: '' })
      setPhotoFile(null)
    }
  }

  const handleEditCaption = (photoId, newCaption) => {
    const updatedPhotos = selectedAlbum.photos.map(photo =>
      photo.id === photoId ? { ...photo, caption: newCaption } : photo
    )
    const updatedAlbum = { ...selectedAlbum, photos: updatedPhotos }
    setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
    setSelectedAlbum(updatedAlbum)
  }

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = selectedAlbum.photos.filter(photo => photo.id !== photoId)
    const updatedAlbum = { ...selectedAlbum, photos: updatedPhotos }
    setAlbums(albums.map(album => (album.id === selectedAlbum.id ? updatedAlbum : album)))
    setSelectedAlbum(updatedAlbum)
  }

  const handleAddAlbum = () => {
    if (newAlbum.title && newAlbum.description) {
      const newAlbumObj = {
        id: albums.length + 1,
        title: newAlbum.title,
        description: newAlbum.description,
        photos: []
      }
      setAlbums([...albums, newAlbumObj])
      setNewAlbum({ title: '', description: '' })
    }
  }

  const handleDeleteAlbum = (albumId) => {
    const updatedAlbums = albums.filter(album => album.id !== albumId)
    setAlbums(updatedAlbums)
    setSelectedAlbum(null)
  }

  return (
    <div className="container mx-auto p-8 bg-pink-50 rounded-lg shadow-xl">
      {/* Danh Sách Album Ảnh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {albums.map(album => (
          <div
            key={album.id}
            className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 cursor-pointer relative"
            onClick={() => handleAlbumClick(album)}
          >
            <img src={album.photos[0]?.url || 'https://via.placeholder.com/300'} alt={album.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
            <h3 className="text-xl font-bold mb-2 text-pink-600">{album.title}</h3>
            <p className="text-pink-700">{album.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteAlbum(album.id)
              }}
              className="absolute top-2 right-2 bg-red-500 text-white font-semibold py-1 px-2 rounded-full hover:bg-red-600"
            >
              Xóa Album
            </button>
          </div>
        ))}
      </div>

      {/* Modal Hiển Thị Các Ảnh Trong Album */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-3xl font-semibold mb-4 text-pink-800">Album: {selectedAlbum.title}</h2>
            <button
              onClick={handleCloseModal}
              className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600 mb-4"
            >
              Đóng
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {selectedAlbum.photos.map(photo => (
                <div key={photo.id} className="bg-pink-100 p-4 rounded-lg shadow-md relative overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover rounded-t-lg"/>
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => handleEditCaption(photo.id, e.target.value)}
                    className="bottom-0 w-full p-2 bg-pink-200 border-t border-pink-300 rounded-b-lg outline-none"
                    placeholder="Chỉnh sửa mô tả"
                  />
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white font-semibold py-1 px-2 rounded-full hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300">
              <h3 className="text-xl font-semibold mb-4 text-pink-800">Thêm Ảnh Mới</h3>
              <label htmlFor="photo-upload" className="mb-5 inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-pink-600 transition duration-300">
                Chọn Ảnh
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {photoFile && (
                <div className="mb-4">
                  <img src={photoFile} alt="Preview" className="w-48 h-48 object-cover object-center rounded-lg"/>
                </div>
              )}
              <textarea
                placeholder="Mô tả ảnh"
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                className="w-full p-2 mb-4 border border-pink-300 rounded outline-none"
              />
              <button
                onClick={handleAddPhoto}
                className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600"
              >
                Thêm Ảnh Vào Album
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thêm Album Mới */}
      <div className="bg-pink-100 p-6 rounded-lg shadow-lg border border-pink-300 mt-8">
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Tạo Album Mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề album"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
          className="w-full p-2 mb-4 border border-pink-300 rounded outline-none"
        />
        <textarea
          placeholder="Mô tả album"
          value={newAlbum.description}
          onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
          className="w-full p-2 mb-4 border border-pink-300 rounded outline-none"
        />
        <button
          onClick={handleAddAlbum}
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600"
        >
          Tạo Album
        </button>
      </div>
    </div>
  )
}

export default MemoryAlbum
