import Button from "../components/button";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1725973319141.json";

const HomePage = () => {
  return (
    <>
      <div className="w-full">
        <div className="inset-0 z-0 min-h-full">
          <Lottie
            animationData={animationData}
            className="w-full h-full"
          />
        </div>
        <div className="w-full h-20  bg-gradient-to-b from-purple-800 to-purple-900"></div>
      </div>
    </>
  );
};

export default HomePage;
