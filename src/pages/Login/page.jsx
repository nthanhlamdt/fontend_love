import { Link } from "react-router-dom";

function Page() {
  return (
    <div
      className="bg-[url('/src/assets/Login_Backgroup.jpg')] bg-cover bg-center 
      w-full h-full flex items-center justify-center"
    >
      <form className="bg-white bg-opacity-75 p-7 max-w-xl text-center rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Đăng nhập</h1>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="text-pink-600 input input-bordered input-accent w-full my-2" 
        />
        <input
          type="text"
          placeholder="Mật khẩu"
          className="text-pink-600 input input-bordered input-accent w-full my-2" 
        />
        <Link className='self-end text-pink-600 text-xs'>Quên mật khẩu</Link>
  
        <Link
          to='/home'
          className="btn bg-pink-600 text-white mb-5 w-full"
        >
          Đăng nhập
        </Link>
        <span className="text-xs">
          Bạn không có tài khoản? <Link className="text-pink-600 underline" to='/signup'>Đăng ký</Link>
        </span>
      </form>
    </div>
  );
}

export default Page;
