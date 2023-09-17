import { useState, useEffect } from "react";
import Scanner from "./components/Scanner";
import Carousel from "./components/Carousel";

function App() {
  const [codes, setCodes] = useState({});
  useEffect(() => {
    const codes = localStorage.getItem("codes");
    if (codes) {
      setCodes(JSON.parse(codes));
    }
  }, []);

  const onDetected = (result) => {
    setCodes((prev) => {
      localStorage.setItem(
        "codes",
        JSON.stringify({ ...prev, [result.code]: result })
      );
      return { ...prev, [result.code]: result };
    });
  };

  return (
    <div className="mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Fidelity Wallet</h1>
        <Scanner onDetected={onDetected} />
        <Carousel codes={codes} />
    </div>
  );
}

export default App;
