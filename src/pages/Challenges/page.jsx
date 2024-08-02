import { useState, useEffect } from 'react'

const challenges = [
  { id: 1, text: 'Viết 10 điều bạn yêu thích về người kia', completed: false },
  { id: 2, text: 'Cùng nhau thử nấu một món ăn mới', completed: false },
  { id: 3, text: 'Cùng nhau xem một bộ phim lãng mạn', completed: false },
  { id: 4, text: 'Tham gia một hoạt động ngoài trời cùng nhau', completed: false },
  { id: 5, text: 'Dành cả ngày không sử dụng điện thoại và tận hưởng khoảnh khắc cùng nhau', completed: false }
]

const RandomChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [proof, setProof] = useState(null)
  const [proofUrl, setProofUrl] = useState(null)

  useEffect(() => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    setCurrentChallenge(randomChallenge)
  }, [])

  const completeChallenge = (challenge) => {
    setCompletedChallenges([...completedChallenges, { ...challenge, proofUrl }])
    setCurrentChallenge(null)
    setProof(null)
    setProofUrl(null)

    const nextChallenge = challenges.find(
      (ch) => !completedChallenges.includes(ch) && ch.id !== challenge.id
    )
    if (nextChallenge) {
      setCurrentChallenge(nextChallenge)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setProofUrl(url)
      setProof(file)
    }
  }

  return (
    <div className="container mx-auto p-8 bg-pink-50 rounded-lg shadow-xl">
      <h1 className="text-5xl font-bold text-center mb-12 text-pink-700">Thách Đố Ngẫu Nhiên</h1>
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Thách Đố Hàng Ngày/Tháng</h2>
        {currentChallenge ? (
          <div className="bg-pink-100 p-8 rounded-lg shadow-lg text-center border border-pink-300">
            <h3 className="text-xl font-bold text-pink-600 mb-4">{currentChallenge.text}</h3>
            {proofUrl && (
              <div className="mb-4">
                <img src={proofUrl} alt="Proof" className="max-w-xs mx-auto h-auto rounded-lg shadow-md"/>
              </div>
            )}
            <label htmlFor="proof-upload" className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-pink-600 transition duration-300">
              Bằng chứng
              <input type="file" id="proof-upload" accept="image/*,video/*" onChange={handleFileUpload} className="hidden"/>
            </label>
            <button
              onClick={() => completeChallenge(currentChallenge)}
              className="bg-pink-500 text-white font-semibold py-2 px-8 rounded-full hover:bg-pink-600 transition duration-300 disabled:opacity-50 mt-4"
              disabled={!proof}
            >
              Hoàn Thành Thách Đố
            </button>
          </div>
        ) : (
          <p className="text-center text-pink-500">Không còn thách đố nào. Tất cả thách đố đã hoàn thành!</p>
        )}
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-pink-800">Bảng Xếp Hạng</h2>
        <div className="bg-pink-100 p-8 rounded-lg shadow-lg border border-pink-300">
          <h3 className="text-xl font-bold mb-4 text-pink-600">Điểm Thưởng</h3>
          <ul className="list-disc list-inside">
            {completedChallenges.map((challenge, index) => (
              <li key={index} className="mb-2 text-pink-600">
                {challenge.text}
                {challenge.proofUrl && <a href={challenge.proofUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-2">Bằng chứng</a>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RandomChallenge