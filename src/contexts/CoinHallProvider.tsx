import React, {
  createContext, FC, ReactElement, ReactNode, useMemo, useRef, useState
} from "react";
import _ from "lodash";
import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config/config";
export type ContractAddress = string
export interface AssetStaticInfo {
  [key: ContractAddress]: {
    assetAddress: ContractAddress,
    name: string,
    symbol: string,
    decimals?: number,
    verified?: boolean,
    icon?: string,
    protocol?: string,
    website?: string,
    twitter?: string,
    telegram?: string,
    instagram?: string,
    facebook?: string
  }
}
export interface AssetDynamicInfo {
  [key: ContractAddress]: {
    assetAddress: ContractAddress,
    totalSupply?: number,
    circSupply?: number,
    circSupplyAPI?: string
  }
}
export interface PoolAssetInfo {
  [key: ContractAddress]: {
    poolAddress: ContractAddress,
    assetAddress: ContractAddress,
    timestamp?: string,
    poolAmount?: number,
    volume24h?: number,
    volume7d?: number
  }
}
export interface PricesInfo {
  [key: ContractAddress]: {
    poolAddress: ContractAddress,
    latest: number,
    historical: number
  }
}
export interface LiquidityPoolInfo {
  [key: ContractAddress]: {
    poolAddress: ContractAddress,
    timestamp: string,
    dex: string,
    baseAsset: ContractAddress,
    otherAsset: ContractAddress
  }
}
export const CoinHallAssetDynamicContext = createContext<{
  AssetDynamic: AssetDynamicInfo
    }>({
      AssetDynamic: {}
    });
export const CoinHallAssetStaticContext = createContext<{
  AssetStatic: AssetStaticInfo
    }>({
      AssetStatic: {}
    });
export const CoinHallPoolDynamicContext = createContext<{
  PoolAsset: PoolAssetInfo,
  Prices: PricesInfo
    }>({
      PoolAsset: {},
      Prices: {}
    });
export const CoinHallPoolStaticContext = createContext<{
  LiquidityPool: LiquidityPoolInfo
    }>({
      LiquidityPool: {}
    });
export const CoinHallMethodContext = createContext<{
  getTokenPairInfo:(axiosParams?: AxiosRequestConfig) => Promise<void>
    }>({
      getTokenPairInfo: () => Promise.resolve()
    });
const CoinHallProvider: FC<{children: ReactNode}> = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseUrl;
  const [AssetStatic, setAssetStatic] = useState<AssetStaticInfo>({});
  const refAssetStatic = useRef({});
  const [AssetDynamic, setAssetDynamic] = useState<AssetDynamicInfo>({});
  const [PoolAsset, setPoolAsset] = useState<PoolAssetInfo>({});
  const [Prices, setPrices] = useState<PricesInfo>({});
  const [LiquidityPool, setLiquidityPool] = useState<LiquidityPoolInfo>({});
  return (
    <CoinHallAssetDynamicContext.Provider value={useMemo(() => ({
      AssetDynamic
    }), [
      AssetDynamic
    ])}
    >
      <CoinHallAssetStaticContext.Provider value={useMemo(() => ({
        AssetStatic
      }), [
        AssetStatic
      ])}
      >
        <CoinHallPoolDynamicContext.Provider value={useMemo(() => ({
          PoolAsset,
          Prices
        }), [
          PoolAsset,
          Prices
        ])}
        >
          <CoinHallPoolStaticContext.Provider value={useMemo(() => ({
            LiquidityPool
          }), [
            LiquidityPool
          ])}
          >
            <CoinHallMethodContext.Provider value={useMemo(() => ({
              // Time Complexity: O(N)
              getTokenPairInfo: (axiosParams?: AxiosRequestConfig) => Promise.all([
                axios.get("/v1/charts/terra/pairs", { ...axiosParams }),
                axios.get("/charts/terra/prices/latest", { ...axiosParams }),
                axios.get("/charts/terra/prices/historical", { ...axiosParams })
              ])
                .then(([r1, r2, r3]) => {
                  const pairs: PairsTransport = r1.data;
                  const prices: LatestPriceTransport = r2.data;
                  const pricesHistory: HistoricalPriceTransport = r3.data;
                  const assetStatic: AssetStaticInfo = {};
                  const assetDynamic: AssetDynamicInfo = {};
                  const poolAsset: PoolAssetInfo = {};
                  const pricesInfo: PricesInfo = {};
                  const liquidityPool: LiquidityPoolInfo = {};
                  Object.keys(pairs).sort().forEach((liquidityContract) => {
                    const baseAssetNum = _.get(pairs, [liquidityContract, "defaultBase"]) as string;
                    const otherAssetNum = baseAssetNum === "asset0" ? "asset1" : "asset0";
                    const baseAsset = _.get(pairs, [liquidityContract, baseAssetNum]) as AssetTransport;
                    const otherAsset = _.get(pairs, [liquidityContract, otherAssetNum]) as AssetTransport;
                    const setLocalAssetStatic = (asset: AssetTransport) => {
                      assetStatic[asset.contractAddress] = {
                        assetAddress: asset.contractAddress,
                        name: asset.name,
                        symbol: asset.symbol,
                        decimals: asset.decimals,
                        verified: asset.verified,
                        icon: asset.icon,
                        protocol: asset.protocol,
                        website: asset.website,
                        twitter: asset.twitter,
                        telegram: asset.telegram,
                        instagram: asset.instagram,
                        facebook: asset.facebook
                      };
                    };
                    const setLocalAssetDynamic = (asset: AssetTransport) => {
                      assetDynamic[asset.contractAddress] = {
                        assetAddress: asset.contractAddress,
                        totalSupply: asset.totalSupply,
                        circSupply: asset.circSupply,
                        circSupplyAPI: asset.circSupplyAPI
                      };
                    };
                    const setLocalPoolAsset = (asset: AssetTransport) => {
                      poolAsset[asset.contractAddress] = {
                        poolAddress: liquidityContract,
                        assetAddress: asset.contractAddress,
                        timestamp: asset.timestamp,
                        poolAmount: asset.poolAmount,
                        volume24h: asset.volume24h,
                        volume7d: asset.volume7d
                      };
                    };
                    setLocalAssetStatic(baseAsset);
                    setLocalAssetStatic(otherAsset);
                    setLocalAssetDynamic(baseAsset);
                    setLocalAssetDynamic(otherAsset);
                    setLocalPoolAsset(baseAsset);
                    setLocalPoolAsset(otherAsset);
                    pricesInfo[liquidityContract] = {
                      poolAddress: liquidityContract,
                      latest: prices[liquidityContract],
                      historical: pricesHistory[liquidityContract]
                    };
                    liquidityPool[liquidityContract] = {
                      poolAddress: liquidityContract,
                      timestamp: _.get(pairs, [liquidityContract, "timestamp"]) as string,
                      dex: _.get(pairs, [liquidityContract, "dex"]) as string,
                      baseAsset: baseAsset.contractAddress,
                      otherAsset: otherAsset.contractAddress
                    };
                  });
                  if (JSON.stringify(refAssetStatic.current) !== JSON.stringify(assetStatic)) {
                    refAssetStatic.current = assetStatic;
                    setAssetStatic(assetStatic);
                  }
                  setAssetDynamic(assetDynamic);
                  setPoolAsset(poolAsset);
                  setLiquidityPool(liquidityPool);
                  setPrices(pricesInfo);
                })
            }), [])}
            >
              {children}
            </CoinHallMethodContext.Provider>
          </CoinHallPoolStaticContext.Provider>
        </CoinHallPoolDynamicContext.Provider>
      </CoinHallAssetStaticContext.Provider>
    </CoinHallAssetDynamicContext.Provider>
  );
};
export default CoinHallProvider;
interface PairsTransport {
  [key: string]: {
    timestamp: string,
    defaultBase: string,
    dex: string,
    asset0: AssetTransport,
    asset1: AssetTransport
  }
}
interface LatestPriceTransport {
  [key: string]: number
}
interface HistoricalPriceTransport {
  [key: string]: number
}
interface AssetTransport {
  contractAddress: ContractAddress,
  name: string,
  symbol: string,
  decimals?: number,
  verified?: boolean,
  icon?: string,
  protocol?: string,
  website?: string,
  twitter?: string,
  telegram?: string,
  instagram?: string,
  facebook?: string,
  timestamp?: string,
  totalSupply?: number,
  circSupply?: number,
  circSupplyAPI?: string,
  poolAmount?: number,
  volume24h?: number,
  volume7d?: number
}
