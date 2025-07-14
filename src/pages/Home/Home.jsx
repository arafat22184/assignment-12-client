import React from "react";
import Banner from "../../components/Banner";
import Featured from "../../components/Featured";
import About from "../../components/About";
import Newsletter from "../../components/Newsletter";
import FeaturedClasses from "../../components/FeaturedClasses";
import Team from "../../components/Team";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <FeaturedClasses></FeaturedClasses>
      <About></About>
      <Newsletter></Newsletter>
      <Team></Team>
    </div>
  );
};

export default Home;
