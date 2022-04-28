import React, {
  FC, ReactElement, useContext
} from "react";
import {
  CoinHallAssetStaticContext,
  CoinHallMethodContext,
  CoinHallPoolDynamicContext,
  CoinHallPoolStaticContext,
  ContractAddress
} from "../contexts/CoinHallProvider";
const PoolCardVol: FC<{
  contractAddress: ContractAddress
}> = ({
  contractAddress
}): ReactElement => {
  const { AssetStatic } = useContext(CoinHallAssetStaticContext);
  const { LiquidityPool } = useContext(CoinHallPoolStaticContext);
  const { PoolAsset } = useContext(CoinHallPoolDynamicContext);
  const { deriveStringfromDecimals } = useContext(CoinHallMethodContext);
  const baseAssetDecimals = AssetStatic[LiquidityPool[contractAddress].baseAsset].decimals;
  const otherAssetAddr = LiquidityPool[contractAddress].otherAsset;
  const otherAssetSymbol = AssetStatic[otherAssetAddr].symbol;
  const otherAsset = PoolAsset[contractAddress + otherAssetAddr];
  return (
    <>
      {!otherAsset.volume24h && null}
      {
        !!otherAsset.volume24h && (
        <div className="text-gray-300 font-mono text-sm leading-4">
          {deriveStringfromDecimals(otherAsset.volume24h, baseAssetDecimals || 0)}
          {" "}
          {otherAssetSymbol}
        </div>
        )
      }
    </>
  );
};
export default PoolCardVol;
