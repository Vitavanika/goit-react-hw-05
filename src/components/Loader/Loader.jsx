import { ClipLoader } from "react-spinners";
import style from "./Loader.module.css";

function Loader() {
  return (
    <div className={style.loaderContainer}>
      <ClipLoader color="#3f51b5" size={50} />
    </div>
  );
}

export default Loader;