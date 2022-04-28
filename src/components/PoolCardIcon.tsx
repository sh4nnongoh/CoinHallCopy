import React, { FC, useContext } from "react";
import {
  CoinHallAssetStaticContext,
  CoinHallPoolStaticContext,
  ContractAddress
} from "../contexts/CoinHallProvider";
import fallback from "../assets/fallback.svg";
const PoolCardIcon: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const baseAsset = AssetStatic[LiquidityPool[contractAddress].baseAsset];
  return (
    <div className="relative flex-none flex rounded-full ring-2">
      <div className="h-10 w-10 rounded-full object-contain">
        <img
          alt={`token-logo-${baseAsset.symbol}`}
          src={baseAsset.icon || fallback}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
      </div>
    </div>
  );
};
export default PoolCardIcon;
