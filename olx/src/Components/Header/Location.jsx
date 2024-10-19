import React from "react";

const Location = () => {
  return (
    <div className="absolute   top-14 shadow-2xl bg-white rounded-lg">
      <i class="fa-solid fa-caret-up fa-2x absolute top-[-18px] left-10 text-white"></i>
      <div className="px-8 py-2 ">
      <i class="fa-solid fa-location-crosshairs me-2"></i><span>Use current location</span>
      </div>
      <hr />
      <div className="px-8 py-2 font-mono">
        <span className="text-slate-500">RECENT LOCATION</span>
        <div><i class="fa-solid fa-location-dot me-2"></i>India</div>
        </div>
      <hr />
      <div className="px-8 py-2 font-mono">
        <span className="text-slate-500">POPULAR LOCATION</span>
        <div><i class="fa-solid fa-location-dot me-2"></i>Thiruvananthapuram</div>
        <div><i class="fa-solid fa-location-dot me-2"></i>Kochi</div>
        <div><i class="fa-solid fa-location-dot me-2"></i>Thrissur</div>
        <div><i class="fa-solid fa-location-dot me-2"></i>Kozhikode</div>
      </div>
    </div>
  );
};

export default Location;
