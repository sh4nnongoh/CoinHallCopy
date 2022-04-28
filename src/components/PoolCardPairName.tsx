import React, { FC, useContext } from "react";
import { CoinHallAssetStaticContext, CoinHallPoolStaticContext, ContractAddress } from "../contexts/CoinHallProvider";
const PoolCardPairName: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const baseAsset = AssetStatic[LiquidityPool[contractAddress].baseAsset];
  const otherAsset = AssetStatic[LiquidityPool[contractAddress].otherAsset];
  return (
    <div className="text-gray-300 text-sm sm:text-base">
      {baseAsset.symbol}
      /
      {otherAsset.symbol}
    </div>
  );
};
export default PoolCardPairName;
