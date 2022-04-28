import React, { FC, useContext } from "react";
import {
  CoinHallAssetDynamicContext,
  CoinHallAssetStaticContext,
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
  const { Prices } = useContext(CoinHallPoolDynamicContext);
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const { AssetDynamic } = useContext(CoinHallAssetDynamicContext);
  const { deriveStringfromDecimals } = useContext(CoinHallMethodContext);
  const baseAsset = AssetDynamic[LiquidityPool[contractAddress].baseAsset];
  const baseAssetDecimals = AssetStatic[LiquidityPool[contractAddress].baseAsset].decimals;
  const otherAsset = AssetStatic[LiquidityPool[contractAddress].otherAsset];
  const baseAssetCirSupply = baseAsset.circSupply;
  const otherAssetSymbol = otherAsset.symbol;
  const latestPrice = Prices[contractAddress].latest;
  const marketcap = baseAssetCirSupply && latestPrice ? baseAssetCirSupply * latestPrice : undefined;
  const marketcapString = marketcap ? deriveStringfromDecimals(marketcap, baseAssetDecimals || 0) : undefined;
  return (
    <>
      {!marketcapString && null}
      {
        !!marketcapString && (
          <div className="text-gray-300 font-mono text-sm leading-4">
            {marketcapString}
            {" "}
            {otherAssetSymbol}
          </div>
        )
      }
    </>
  );
};
export default PoolCardMC;
