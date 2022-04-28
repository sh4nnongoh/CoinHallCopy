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
      <div className="h-screen w-screen bg-sky-900 overflow-auto justify-items-start">
        <Navbar />
        <GetCoinHallData isLoading={isLoading} setIsLoading={setIsLoading} />
        <Home />
      </div>
    </CoinHallProvider>
  );
};
export default App;
