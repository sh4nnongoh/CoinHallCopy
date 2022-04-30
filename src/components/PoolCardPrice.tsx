import React, { FC, ReactElement, useContext } from "react";
import { CoinHallPoolDynamicContext, ContractAddress } from "../contexts/CoinHallProvider";
const PoolCardPrice: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) : ReactElement => {
  const { Prices } = useContext(CoinHallPoolDynamicContext);
  const price = Prices[contractAddress].latest;
  const formatedPrice = price && price?.toString().length > 6 ? price?.toPrecision(6) : price;
  return (
    <>
      {!price && null}
      {
        !!price
        && (
          <div className="font-mono text-gray-50 -mb-1">
            {formatedPrice}
            {" "}
            UST
          </div>
        )
      }
    </>
  );
};
export default PoolCardPrice;
