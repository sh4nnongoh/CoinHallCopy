import React, { useState } from "react";
import { ConnectType, useWallet } from "@terra-money/wallet-provider";
import { ReactComponent as WC } from "../assets/walletConnect.svg";
import { ReactComponent as Cross } from "../assets/cross.svg";
const WalletConnect = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    connect
  } = useWallet();
  return (
    <>
      <button
        type="button"
        className="font-semibold bg-violet-700 bg-opacity-40 text-violet-200
        hover:bg-opacity-60 hover:text-violet-100 h-full px-3 rounded-md
        transition duration-100 text-base md:text-lg h-[2.4rem]"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Connect Wallet
      </button>
      {
        modalOpen && (
          <div
            role="dialog"
            aria-hidden="true"
            onClick={() => setModalOpen(false)}
            className="fixed left-0 bottom-0 h-screen w-screen bg-black/50
            backdrop-blur-sm flex justify-center items-center"
          >
            <div
              style={{
                width: "90vw",
                maxWidth: "22rem"
              }}
              className="relative rounded-lg bg-gray-800 ring-1 ring-gray-700"
            >
              <div className="p-4 h-full space-y-4">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  Connect Wallet
                </h1>
                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={() => connect(ConnectType.WALLETCONNECT)}
                    className="flex items-center rounded transition duration-100
                    hover:ring-1 hover:ring-violet-800 bg-gray-700 hover:bg-violet-800
                    w-full font-semibold text-lg"
                  >
                    <div className="h-14 w-14 bg-gray-900 rounded-l">
                      <WC style={{
                        padding: "0.75rem"
                      }}
                      />
                    </div>
                    <div className="flex-1 px-2">
                      Wallet Connect
                    </div>
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-0 right-0 rounded-full -mr-4 -mt-4
                text-gray-400 hover:text-gray-300"
              >
                <Cross />
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};
export default WalletConnect;
