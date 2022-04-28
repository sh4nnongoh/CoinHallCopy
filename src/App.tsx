import React, {
  FC, ReactElement
} from "react";
import Navbar from "./components/Navbar";
import CoinHallProvider from "./contexts/CoinHallProvider";
import Home from "./views/Home";
const App: FC = (): ReactElement => (
  <CoinHallProvider>
    <div className="h-screen w-screen bg-sky-900 overflow-auto justify-items-start">
      <Navbar />
      <Home />
    </div>
  </CoinHallProvider>
);
export default App;
