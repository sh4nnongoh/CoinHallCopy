import React, {
  ReactElement, useContext, useEffect
} from "react";
import { CoinHallMethodContext } from "../contexts/CoinHallProvider";
const GetCoinHallDataTimer = (): ReactElement => {
  const { getTokenPairInfo } = useContext(CoinHallMethodContext);
  useEffect(() => {
    const timer = setInterval(() => {
      getTokenPairInfo();
    }, 10000);
    return () => clearInterval(timer);
  }, [getTokenPairInfo]);
  return (
    <div className="invisible w-0 h-0">Timer Started</div>
  );
};
export default GetCoinHallDataTimer;
