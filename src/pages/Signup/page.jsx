import { Link } from "react-router-dom";
function Page() {
  return (
    <div
      className="bg-[url('/src/assets/Login_Backgroup.jpg')] bg-cover bg-center 
      w-full h-full flex items-center justify-center"
    >
      <form className="bg-white bg-opacity-75 p-7 shadow-md max-w-96 text-center rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Đăng Ký</h1>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="text-pink-600 input input-bordered input-accent w-full my-2 px-4" 
        />
        <input
          type="text"
          placeholder="Mật khẩu"
          className="text-pink-600 input input-bordered input-accent w-full my-2 px-4" 
        />
        
  
        <Link
          to='/home'
          className="btn bg-pink-600 text-white mb-5 w-full"
        >
          Đăng Ký
        </Link>
        <span className=" text-xs">
          Bạn đã có tài khoản? <Link className="text-pink-600 underline" to='/login'>Đăng nhập</Link>
        </span>
      </form>
    </div>
  );
}

export default Page;
