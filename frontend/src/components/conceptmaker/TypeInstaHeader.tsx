import { IoMdHeartEmpty } from "react-icons/io";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function TypeInstaHeader() {
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <div className="flex items-center justify-center ">
        <img
          src="/src/assets/images/conceptmaker/logo-insta.png"
          alt="logo"
          width="80"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center me-2">
          <IoMdHeartEmpty className=" text-xl" />
        </div>

        <div className="flex items-center text-xl">
          <IoPaperPlaneOutline />
        </div>
      </div>
    </div>
  );
}
