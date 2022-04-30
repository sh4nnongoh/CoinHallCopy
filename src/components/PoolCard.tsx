import React, { FC, ReactElement } from "react";
import { ContractAddress } from "../contexts/CoinHallProvider";
import PoolCardIcon from "./PoolCardIcon";
import PoolCardMC from "./PoolCardMC";
import PoolCardName from "./PoolCardName";
import PoolCardPairName from "./PoolCardPairName";
import PoolCardPrice from "./PoolCardPrice";
import PoolCardPriceChg from "./PoolCardPriceChg";
import PoolCardVol from "./PoolCardVol";
const PoolCard: FC<{
  contractAddress: ContractAddress,
  index: number
}> = ({
  contractAddress,
  index
}) : ReactElement => (
  <div
    data-testid="pool-card"
    className="relative min-w-0 p-4 bg-gray-800
    rounded-lg hover:bg-violet-600 hover:bg-opacity-30
    hover:shadow-violet-900/25 hover:shadow-lg transition duration-100"
  >
    <div className="absolute top-0 right-0 text-sm px-[0.4rem]
    text-gray-300 bg-gray-700 rounded-tr-lg rounded-bl-lg font-mono"
    >
      #
      {index + 1}
    </div>
    <div className="flex justify-start items-center space-x-4">
      <PoolCardIcon contractAddress={contractAddress} />
      <div className="flex-1 flex flex-col truncate">
        <PoolCardName contractAddress={contractAddress} />
        <PoolCardPairName contractAddress={contractAddress} />
      </div>
    </div>
    <div className="relative flex flex-col mt-3 -mb-1">
      <div className="flex space-x-[0.4rem] font-mono text-gray-50 sm:text-xl -mb-1">
        <div>
          <div className="text-gray-400 text-opacity-75
          font-semibold text-xs leading-4"
          >
            Mkt Cap
          </div>
          <div className="text-gray-400 text-opacity-75
          font-semibold text-xs leading-4"
          >
            Vol (24h)
          </div>
        </div>
        <div>
          <PoolCardMC contractAddress={contractAddress} />
          <PoolCardVol contractAddress={contractAddress} />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex flex-col items-end">
        <PoolCardPrice contractAddress={contractAddress} />
        <PoolCardPriceChg contractAddress={contractAddress} />
      </div>
    </div>
  </div>
);
export default PoolCard;
// flex space-x-[0.4rem]
