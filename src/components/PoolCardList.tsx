import React, { useContext } from "react";
import { CoinHallPoolStaticContext } from "../contexts/CoinHallProvider";
import PoolCard from "./PoolCard";
const PoolCardList = () => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const cards = Object
    .keys(LiquidityPool)
    .map((contractAddress, i) => <PoolCard key={contractAddress} contractAddress={contractAddress} index={i} />);
  return (
    <div className="flex flex-col m-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
      {cards}
    </div>
  );
};
export default PoolCardList;
