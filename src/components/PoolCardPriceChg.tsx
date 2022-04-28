import React, { FC, useContext } from "react";
import { CoinHallPoolDynamicContext, ContractAddress } from "../contexts/CoinHallProvider";
const PoolCardPriceChg: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { Prices } = useContext(CoinHallPoolDynamicContext);
  const currPrice = Prices[contractAddress].latest;
  const ytdPrice = Prices[contractAddress].historical;
  const priceChg = !!currPrice && !!ytdPrice ? (((currPrice - ytdPrice) * 100) / ytdPrice) : undefined;
  const color = () => {
    if (!priceChg || priceChg === 0) {
      return "text-grey-400";
    }
    if (priceChg > 0) {
      return "text-green-300";
    }
    return "text-red-300";
  };
  return (
    <>
      { (!currPrice || !ytdPrice) && null }
      { !!currPrice && !!ytdPrice
        && (
        <div className={`font-mono text-gray-400 text-sm sm:text-base ${color()}`}>
          24h:
            {" "}
          {priceChg?.toFixed(2)}
          %
        </div>
        )}
    </>
  );
};
export default PoolCardPriceChg;
