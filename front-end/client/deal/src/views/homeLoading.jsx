import Lottie from "lottie-react";
import backGroundIMG from "../assets/Background.json";
import Animation1 from "../assets/Animation-1.json";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const HomeLoading = () => {
  const { currentTheme, theme } = useContext(themeContext);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <>
      {/* <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900"> */}
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0 h-screen">
        <Lottie animationData={backGroundIMG} className="w-full min-h-screen" />
      </div> */}
      <div className={theme[currentTheme].bgColor}>
        <div className="z-1 hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <Lottie animationData={Animation1} />
              <h1 className="text-2xl">
                Hi <span className="text-purple-700 font-bold">!</span> Welcome
                to
                <span className="font-bold"> DealBrokers</span>
              </h1>
              <p className="py-6">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-xl rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                  onClick={goToHome}
                >
                  Join Chat
                </button>
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default HomeLoading;
