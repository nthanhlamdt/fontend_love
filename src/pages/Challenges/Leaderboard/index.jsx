function Leaderboard() {
  return (
    <div className="card bg-pink-100 shadow-lg rounded-lg overflow-auto h-72">
      <h2 className="text-2xl font-semibold text-white bg-pink-500 p-4">
        Bảng xếp hạng
      </h2>
      <div className="p-3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-200 text-pink-800">
              <th className="py-3 px-4 text-left">Hạng</th>
              <th className="py-3 px-4 text-left">Họ Tên</th>
              <th className="py-3 px-4 text-right">Điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-pink-200 hover:bg-pink-50 transition-colors duration-200">
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">Ngô Thành Lâm</td>
              <td className="py-3 px-4 text-right text-pink-800">1,500</td>
            </tr>
            <tr className="border-b border-pink-200 hover:bg-pink-50 transition-colors duration-200">
              <td className="py-3 px-4">2</td>
              <td className="py-3 px-4">Võ Thị Na Vi</td>
              <td className="py-3 px-4 text-right text-pink-800">1,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
