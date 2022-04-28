import React, { FC, useContext } from "react";
import {
  CoinHallAssetStaticContext,
  CoinHallPoolStaticContext,
  ContractAddress
} from "../contexts/CoinHallProvider";
const PoolCardIcon: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const baseAsset = AssetStatic[LiquidityPool[contractAddress].baseAsset];
  return (
    <div className="w-10">
      {baseAsset.icon && <img alt={`token-logo-${baseAsset.symbol}`} src={baseAsset.icon} />}
    </div>
  );
};
export default PoolCardIcon;
