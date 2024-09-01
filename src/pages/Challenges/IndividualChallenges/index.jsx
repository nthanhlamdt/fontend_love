function IndividualChallenges() {
  return (
    <div>
      <div className="card bg-pink-100 shadow-lg rounded-lg overflow-auto h-72">
        <h2 className="text-2xl font-semibold text-white bg-pink-500 p-4 rounded-t-lg">
          Thử thách cá nhân
        </h2>

        <div className="p-6">
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">Nấu một công thức mới</h3>
          <p className="text-pink-700 mb-6">
            We made a delicious pasta dish and had a great time cooking together.
          </p>
          <div className="flex justify-between items-center">
            <button
              className="bg-pink-500 text-white rounded-lg py-2 px-4 hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              aria-label="Complete Challenge"
            >
              Hoàn thành thử thách
            </button>
            <div className="flex items-center space-x-2 text-pink-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-label="Points icon"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span className="text-pink-700">150 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualChallenges
