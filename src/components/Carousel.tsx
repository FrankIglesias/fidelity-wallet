import React, { Component } from "react";
import Barcode from "react-barcode";
import Glider from "react-glider";
import "glider-js/glider.min.css";

const gradients = [
  `linear-gradient(to right, #ee9ca7, #ffdde1)`,
  'linear-gradient(to top right, #2193b0, #6dd5ed)',
  'linear-gradient(to top left, #c6ffdd, #fbd786, #f7797d)',
  'linear-gradient(to bottom right, #373b44, #4286f4)',
];

export default function Carousel({ codes }) {
  if (!Object.values(codes).length) return null;
  return (
    <div className="max-w-screen-sm">
      <Glider slidesToShow={1} scrollLock draggable itemsWidth={300}>
        {Object.values(codes).map((code, index) => (
          <div key={code.code}>
            <div
              className={`p-4 rounded shadow flex flex-col items-center mr-2`}
              style={{ background: gradients[index] }}
            >
              <Barcode
                value={code.code}
                format={code.format.replace("_", "").toUpperCase()}
                height={80}
                width={2}
              />
              <p className="text-center text-gray-700 text-sm mt-2">
                {code.cardName}
              </p>
            </div>
          </div>
        ))}
      </Glider>
    </div>
  );
}
