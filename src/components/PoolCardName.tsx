import React, { FC, useContext } from "react";
import {
  CoinHallAssetStaticContext,
  CoinHallPoolStaticContext,
  ContractAddress
} from "../contexts/CoinHallProvider";
const PoolCardName: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const baseAsset = AssetStatic[LiquidityPool[contractAddress].baseAsset];
  return (
    <div
      className="flex justify-between items-center text-gray-50 sm:text-xl font-extrabold truncate"
    >
      {baseAsset.name}
    </div>
  );
};
export default PoolCardName;
