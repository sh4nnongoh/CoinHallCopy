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
    circSupplyAPI?: string,
    price?: number,
    mainPool? : ContractAddress
  }
}
export interface PoolAssetInfo {
  [key: ContractAddress]: {
    poolAddress: ContractAddress,
    assetAddress: ContractAddress,
    timestamp?: string,
    poolAmount?: number,
    volume24h?: number,
    volume7d?: number,
    marketcap?: number,
    mcSymbol: string
  }
}
export interface PricesInfo {
  [key: ContractAddress]: {
    poolAddress: ContractAddress,
    latest?: number,
    historical?: number
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
export const CoinHallFilterSortContext = createContext<{
  PoolCardList: ContractAddress[]
    }>({
      PoolCardList: []
    });
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
  getTokenPairInfo:(axiosParams?: AxiosRequestConfig) => Promise<void>,
  filterAndSortPoolCards: () => void,
  deriveStringfromDecimals: (mc: number, decimals: number) => string,
  setPoolCardList: React.Dispatch<React.SetStateAction<ContractAddress[]>>
    }>({
      getTokenPairInfo: () => Promise.resolve(),
      filterAndSortPoolCards: () => "",
      deriveStringfromDecimals: () => "",
      setPoolCardList: () => ""
    });
const CoinHallProvider: FC<{children: ReactNode}> = ({ children }): ReactElement => {
  axios.defaults.baseURL = config.axios.baseUrl;
  const [AssetStatic, setAssetStatic] = useState<AssetStaticInfo>({});
  const [AssetDynamic, setAssetDynamic] = useState<AssetDynamicInfo>({});
  const [PoolAsset, setPoolAsset] = useState<PoolAssetInfo>({});
  const [Prices, setPrices] = useState<PricesInfo>({});
  const [LiquidityPool, setLiquidityPool] = useState<LiquidityPoolInfo>({});
  const [PoolCardList, setPoolCardList] = useState<ContractAddress[]>([]);
  const refAssetStatic = useRef({});
  const refAssetDynamic = useRef({});
  const refPoolAsset = useRef({});
  const refLiquidityPool = useRef({});
  return (
    <CoinHallFilterSortContext.Provider value={useMemo(() => ({
      PoolCardList
    }), [
      PoolCardList
    ])}
    >
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
                      const setLocalAssetDynamic = (asset: AssetTransport, other: AssetTransport) => {
                        assetDynamic[asset.contractAddress] = {
                          ...assetDynamic[asset.contractAddress],
                          assetAddress: asset.contractAddress,
                          totalSupply: asset.totalSupply,
                          circSupply: asset.circSupply,
                          circSupplyAPI: asset.circSupplyAPI
                        };
                        if (!prices[liquidityContract]
                          || other.contractAddress !== "uusd") {
                          return;
                        }
                        const price = prices[liquidityContract];
                        const { mainPool } = assetDynamic[asset.contractAddress];
                        if (assetDynamic[asset.contractAddress].price && mainPool) {
                          const { defaultBase } = pairs[mainPool];
                          const prevAsset = _.get(pairs, [mainPool, defaultBase]) as AssetTransport;
                          const prevAssetPoolAmt = prevAsset.poolAmount || 0;
                          const curAssetPoolAmt = asset.poolAmount || 0;
                          if (curAssetPoolAmt > prevAssetPoolAmt) {
                            assetDynamic[asset.contractAddress] = {
                              ...assetDynamic[asset.contractAddress],
                              price,
                              mainPool: liquidityContract
                            };
                            return;
                          }
                        }
                        assetDynamic[asset.contractAddress] = {
                          ...assetDynamic[asset.contractAddress],
                          price,
                          mainPool: liquidityContract
                        };
                      };
                      const setLocalPoolAsset = (asset: AssetTransport, other: AssetTransport) => {
                        const assetPrice = asset.poolAmount && other.poolAmount
                          ? other.poolAmount / asset.poolAmount
                          : undefined;
                        const marketcap = asset.circSupply && assetPrice ? asset.circSupply * assetPrice : undefined;
                        poolAsset[liquidityContract + asset.contractAddress] = {
                          poolAddress: liquidityContract,
                          assetAddress: asset.contractAddress,
                          timestamp: asset.timestamp,
                          poolAmount: asset.poolAmount,
                          volume24h: asset.volume24h,
                          volume7d: asset.volume7d,
                          marketcap,
                          mcSymbol: other.symbol
                        };
                      };
                      setLocalAssetStatic(baseAsset);
                      setLocalAssetStatic(otherAsset);
                      setLocalAssetDynamic(baseAsset, otherAsset);
                      setLocalAssetDynamic(otherAsset, baseAsset);
                      setLocalPoolAsset(baseAsset, otherAsset);
                      setLocalPoolAsset(otherAsset, baseAsset);
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
                    refAssetDynamic.current = assetDynamic;
                    setAssetDynamic(assetDynamic);
                    refPoolAsset.current = poolAsset;
                    setPoolAsset(poolAsset);
                    refLiquidityPool.current = liquidityPool;
                    setLiquidityPool(liquidityPool);
                    setPrices(pricesInfo);
                  }),
                // Time Complexity: O(N)
                filterAndSortPoolCards: () => {
                  const asset = refAssetDynamic.current as AssetDynamicInfo;
                  const poolAssets = refPoolAsset.current as PoolAssetInfo;
                  const liquidityPools = refLiquidityPool.current as LiquidityPoolInfo;
                  const poolCardList: ContractAddress[] = Object
                    .keys(liquidityPools)
                    .sort((a: ContractAddress, b: ContractAddress) => {
                      const poolABaseAsset = poolAssets[a + liquidityPools[a].baseAsset];
                      const poolBBaseAsset = poolAssets[b + liquidityPools[b].baseAsset];
                      if (poolABaseAsset.assetAddress < poolBBaseAsset.assetAddress) {
                        return 1;
                      }
                      if (poolABaseAsset.assetAddress > poolBBaseAsset.assetAddress) {
                        return -1;
                      }
                      const poolAPoolAmt = poolABaseAsset.poolAmount || 0;
                      const poolBPoolAmt = poolBBaseAsset.poolAmount || 0;
                      if (poolAPoolAmt < poolBPoolAmt) {
                        return 1;
                      }
                      if (poolAPoolAmt > poolBPoolAmt) {
                        return -1;
                      }
                      return 0;
                    })
                    .reduce((acc: ContractAddress[], cur: ContractAddress) => {
                      if (acc.length === 0) {
                        return [cur];
                      }
                      const curPoolBaseAsset = poolAssets[cur + liquidityPools[cur].baseAsset];
                      const prePoolBaseAsset = poolAssets[acc[acc.length - 1]
                        + liquidityPools[acc[acc.length - 1]].baseAsset];
                      if (!curPoolBaseAsset.poolAmount
                        || curPoolBaseAsset.assetAddress === prePoolBaseAsset.assetAddress) {
                        return acc;
                      }
                      return [
                        ...acc,
                        cur
                      ];
                    }, [])
                    .sort((a: ContractAddress, b: ContractAddress) => {
                      const poolABaseAsset = poolAssets[a + liquidityPools[a].baseAsset];
                      const poolBBaseAsset = poolAssets[b + liquidityPools[b].baseAsset];
                      const poolAOtherAsset = poolAssets[a + liquidityPools[a].otherAsset];
                      const poolBOtherAsset = poolAssets[b + liquidityPools[b].otherAsset];
                      let poolABaseAssetMC = poolABaseAsset.marketcap ? (poolABaseAsset.marketcap / 10 ** 6) : 0;
                      let poolBBaseAssetMC = poolBBaseAsset.marketcap ? (poolBBaseAsset.marketcap / 10 ** 6) : 0;
                      if (poolAOtherAsset.assetAddress !== "uusd") {
                        const otherAssetUSDPrice = asset[poolAOtherAsset.assetAddress].price || 0;
                        poolABaseAssetMC *= otherAssetUSDPrice;
                      }
                      if (poolBOtherAsset.assetAddress !== "uusd") {
                        const otherAssetUSDPrice = asset[poolBOtherAsset.assetAddress].price || 0;
                        poolBBaseAssetMC *= otherAssetUSDPrice;
                      }
                      if (poolABaseAssetMC < poolBBaseAssetMC) {
                        return 1;
                      }
                      if (poolABaseAssetMC > poolBBaseAssetMC) {
                        return -1;
                      }
                      return 0;
                    });
                  setPoolCardList(poolCardList);
                },
                deriveStringfromDecimals: (mc: number, decimals = 0) => {
                  const bilMC = Number((mc / (1000000000 * 10 ** decimals)).toFixed(2));
                  const milMC = Number((mc / (1000000 * 10 ** decimals)).toFixed(2));
                  const kMC = Number((mc / (1000 * 10 ** decimals)).toFixed(2));
                  if (bilMC >= 1) {
                    return `${bilMC}B`;
                  }
                  if (milMC >= 1) {
                    return `${milMC}M`;
                  }
                  if (kMC >= 1) {
                    return `${kMC}K`;
                  }
                  return `${Number((mc / (1 * 10 ** decimals)).toFixed(2))}`;
                },
                setPoolCardList
              }), [])}
              >
                {children}
              </CoinHallMethodContext.Provider>
            </CoinHallPoolStaticContext.Provider>
          </CoinHallPoolDynamicContext.Provider>
        </CoinHallAssetStaticContext.Provider>
      </CoinHallAssetDynamicContext.Provider>
    </CoinHallFilterSortContext.Provider>
  );
};
export default CoinHallProvider;
interface PairsTransport {
  [key: ContractAddress]: {
    timestamp: string,
    defaultBase: string,
    dex: string,
    asset0: AssetTransport,
    asset1: AssetTransport
  }
}
interface LatestPriceTransport {
  [key: ContractAddress]: number
}
interface HistoricalPriceTransport {
  [key: ContractAddress]: number
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
