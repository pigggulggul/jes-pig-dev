import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-20 flex justify-between items-center bg-gray-50 px-8">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl color-text-main">꿀꿀돼지</h1>
          <h1 className="text-3xl">연구소</h1>
        </Link>
        <Link to="/headermaker" className="text-xl mx-8 cursor-pointer">
          헤더 메이커
        </Link>
        <Link to="/componentmaker" className="text-xl cursor-pointer">
          컨셉 메이커
        </Link>
      </div>
      <div className="flex items-center">
        <p className="text-2xl mx-8 px-4 cursor-pointer color-text-main">
          로그인
        </p>
        <p className="text-2xl px-6 py-2 rounded-xl color-bg-main color-text-lightgray1 cursor-pointer">
          가입하기
        </p>
      </div>
    </div>
  );
}
