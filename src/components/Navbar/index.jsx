import { Link } from 'react-router-dom'

function index() {
  return (
    <div className="flex justify-between bg-pink-600 text-white">
      <div className="navbar-start text-white">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                className="text-white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-pink-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li className="text-white"><Link to='/'>Trang Chủ</Link></li>
            <li className="text-white"><Link to='/album'>Album Ảnh</Link></li>
            <li className="text-white"><Link to='celebrate'>Kỷ Niệm</Link></li>
            <li className="text-white"><Link to='challenges'>Thử Thách</Link></li>
            <li className="text-white"><Link to='/cooking'>Nấu Ăn</Link></li>
            <li className="text-white"><Link to='/learning'>Học Tập</Link></li>
            <li className="text-white"><Link to='/timeCapsule'>Hộp Thời Gian</Link></li>
            <li className="text-white"><Link to='/postPicture'>Đăng Ảnh</Link></li>
            <li className="text-white"><Link to='/virtualGifts'>Quà Tặng</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ForLove</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="text-white"><Link to='/'>Trang Chủ</Link></li>
          <li className="text-white"><Link to='/album'>Album Ảnh</Link></li>
          <li className="text-white"><Link to='celebrate'>Kỷ Niệm</Link></li>
          <li className="text-white"><Link to='challenges'>Thử Thách</Link></li>
          <li className="text-white"><Link to='/cooking'>Nấu Ăn</Link></li>
          <li className="text-white"><Link to='/learning'>Học Tập</Link></li>
          <li className="text-white"><Link to='/timeCapsule'>Hộp Thời Gian</Link></li>
          <li className="text-white"><Link to='/postPicture'>Đăng Ảnh</Link></li>
          <li className="text-white"><Link to='/virtualGifts'>Quà Tặng</Link></li>
        </ul>
      </div>

      <div className="w-10 mx-10 dropdown dropdown-end justify-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-pink-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li className="text-white">
            <a className="justify-between">
              Profile
            </a>
          </li>
          <li className="text-white"><a>Settings</a></li>
          <li className="text-white"><Link to='/login'>Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default index
