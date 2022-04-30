import React, { useContext } from "react";
import { CoinHallFilterSortContext } from "../contexts/CoinHallProvider";
import PoolCard from "./PoolCard";
const PoolCardList = () => {
  const { PoolCardList: cardList } = useContext(CoinHallFilterSortContext);
  const cards = cardList
    .slice(0, 24)
    .map((contractAddress, i) => (
      <PoolCard
        key={contractAddress}
        contractAddress={contractAddress}
        index={i}
      />
    ));
  return (
    <div className="flex flex-col m-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards}
    </div>
  );
};
export default PoolCardList;
