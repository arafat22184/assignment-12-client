import React from "react";
import Banner from "../../components/Banner";
import Featured from "../../components/Featured";
import About from "../../components/About";
import Newsletter from "../../components/Newsletter";
import FeaturedClasses from "../../components/FeaturedClasses";
import Team from "../../components/Team";
import ReviewsCarousel from "../ReviewsCarousel/ReviewsCarousel";
import ForumHome from "../../components/ForumHome";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <FeaturedClasses></FeaturedClasses>
      <About></About>
      <ForumHome></ForumHome>
      <Newsletter></Newsletter>
      <Team></Team>
      <ReviewsCarousel></ReviewsCarousel>
    </div>
  );
};

export default Home;
