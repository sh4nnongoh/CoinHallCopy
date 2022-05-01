import React from "react";
import { createRoot } from "react-dom/client";
import { getChainOptions, WalletControllerChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  getChainOptions().then((chainOptions: WalletControllerChainOptions) => {
    root.render(
      <WalletProvider
        defaultNetwork={chainOptions.defaultNetwork}
        walletConnectChainIds={chainOptions.walletConnectChainIds}
      >
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </WalletProvider>
    );
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
