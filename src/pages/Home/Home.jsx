import React from "react";
import Banner from "../../components/Banner";
import Featured from "../../components/Featured";
import About from "../../components/About";
import Newsletter from "../../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
