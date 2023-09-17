import React, { useEffect, useState, useRef } from "react";
import Quagga from "quagga";

const config = {
  inputStream: {
    type: "LiveStream",
    constraints: {
      facingMode: "environment",
      aspectRatio: { min: 1, max: 2 }
    }
  },
  numOfWorkers: 2,
  frequency: 10,
  decoder: {
    readers: ["ean_reader"]
  }
};

const Scanner = ({ onDetected }) => {
  const [showScanner, setShowScanner] = useState(false);
  const cardName = useRef();
  useEffect(() => {
    if (showScanner) {
      Quagga.init(config, (err) => {
        if (err) {
          console.log(err, "error msg");
        }
        Quagga.start();
        return () => {
          Quagga.stop();
        };
      });
      Quagga.onDetected(detected);
    }
  }, [showScanner]);

  const toggleScanner = (code) => {
    setShowScanner((prev) => !prev);
  };

  const detected = (result) => {
    const name = cardName.current.value;
    onDetected({ ...result.codeResult, cardName: name });
    Quagga.stop();
    setShowScanner(false);
  };

  return (
    <div>
      {showScanner ? (
        <>
          <div className="relative">
            <div id="interactive" className="viewport w-[350px] h-[300]" />
          </div>
          <input ref={cardName} type="text" placeholder="Enter card name" className="my-4 w-full p-2" />
        </>
      ) : (
        <button onClick={toggleScanner} className="my-4">Scan new card</button>
      )}
    </div>
  );
};

export default Scanner;
