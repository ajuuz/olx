import React from "react";
import bottomBanner from "../../assets/bottomBannerr-LyvpQfug.png";
import lastBanner from '../../assets/last-banner.png'
const Footer = () => {
  return (
    <div>
      <div className="bottomBanner">
        <img src={bottomBanner} alt="" className=" w-[100%]" />
      </div>
      <br />
      <br />
      <div className="bg-gray-300 flex flex-wrap p-10">
        <ul className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <h1 className="font-bold">Popular Locations</h1>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul>
        <ul className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <h1 className="font-bold">Popular Locations</h1>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul>
        <ul className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <h1 className="font-bold">Popular Locations</h1>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul>
        <ul className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <h1 className="font-bold">Popular Locations</h1>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul> 
      </div>
      <div>
        <img src={lastBanner} alt="" className="w-[100%]" />
      </div>
    </div>
  );
};

export default Footer;
