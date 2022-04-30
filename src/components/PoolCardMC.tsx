import React, { FC, useContext } from "react";
import {
  CoinHallAssetDynamicContext,
  CoinHallMethodContext,
  CoinHallPoolDynamicContext,
  CoinHallPoolStaticContext,
  ContractAddress
} from "../contexts/CoinHallProvider";
const PoolCardMC: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}) => {
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { AssetDynamic } = useContext(CoinHallAssetDynamicContext);
  const { PoolAsset } = useContext(CoinHallPoolDynamicContext);
  const { deriveStringfromDecimals } = useContext(CoinHallMethodContext);
  const baseAsset = AssetDynamic[LiquidityPool[contractAddress].baseAsset];
  const poolAsset = PoolAsset[contractAddress + baseAsset.assetAddress];
  const marketcapString = poolAsset.marketcap ? deriveStringfromDecimals(poolAsset.marketcap, 6) : undefined;
  return (
    <>
      {!marketcapString && null}
      {
        !!marketcapString && (
          <div className="text-gray-300 font-mono text-sm leading-4">
            {marketcapString}
            {" "}
            {poolAsset.mcSymbol}
          </div>
        )
      }
    </>
  );
};
export default PoolCardMC;
