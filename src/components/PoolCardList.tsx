import React, { FC, useContext } from "react";
import { CoinHallFilterSortContext } from "../contexts/CoinHallProvider";
import PoolCard from "./PoolCard";
const PoolCardList: FC<{
  page: number
}> = ({
  page
}) => {
  const { PoolCardList: cardList } = useContext(CoinHallFilterSortContext);
  const cards = cardList
    .slice((page - 1) * 24, page * 24)
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
