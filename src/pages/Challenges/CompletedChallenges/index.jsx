import Challenge from './Challenge/index'

function CompletedChallenges() {
  return (
    <div className="card bg-pink-100 shadow-lg rounded-lg overflow-auto relative h-72"> {/* Điều chỉnh chiều cao nếu cần */}

      <h2
        className="text-2xl font-semibold text-white mb-4 bg-pink-500 p-4 absolute top-0 left-0 right-0 rounded-t-lg"
      >
        Thử thách đã hoàn thành
      </h2>

      <div className="pt-20 pb-6 px-6 space-y-6 overflow-y-auto">
        <Challenge />
        <Challenge />
        <Challenge />
      </div>
    </div>
  )
}

export default CompletedChallenges
