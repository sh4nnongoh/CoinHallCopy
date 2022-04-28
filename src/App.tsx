import React, {
  FC, ReactElement, useState
} from "react";
import GetCoinHallData from "./components/GetCoinHallData";
import Navbar from "./components/Navbar";
import CoinHallProvider from "./contexts/CoinHallProvider";
import Home from "./views/Home";
const App: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <CoinHallProvider>
      <div className="h-screen w-screen bg-gray-900 overflow-auto justify-center">
        <Navbar />
        <GetCoinHallData isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="max-w-5xl px-4 m-auto flex flex-col mb-12">
          <Home />
        </div>
      </div>
    </CoinHallProvider>
  );
};
export default App;
