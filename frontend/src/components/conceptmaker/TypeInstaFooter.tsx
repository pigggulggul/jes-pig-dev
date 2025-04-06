import { MdHomeFilled } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";
import ImageFrame from "./ImageFrame";
import { ImagePosType } from "../../types/conceptmaker/comceptMakerUi";
export default function TypeInstaFooter(props: {
  image: string;
  resize: ImagePosType;
}) {
  return (
    <div className="w-full flex justify-around">
      <MdHomeFilled className="w-6 h-6" />
      <IoSearchOutline className="w-6 h-6" />
      <FiPlusSquare className="w-6 h-6" />
      <BiMoviePlay className="w-6 h-6" />
      <div className="relative w-6 h-6 rounded-full object-cover overflow-hidden">
        <ImageFrame image={props.image} resize={props.resize} />
      </div>
    </div>
  );
}
