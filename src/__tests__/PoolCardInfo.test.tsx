import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
GIVEN a list of token pair information & pair prices,
WHEN user navigates to the webapp,
THEN user sees the information displayed as follows:
(1) Token logo
(2) Token name
(3) Token pair name
(4) Marketcap
(5) 24hr Volume
(6) Current token price wrt base token
(7) 24hr price change
(8) Sorted list number
`;
describe(userStory, () => {
  const latestTokenPrice = {
    valid1: 50000
  };
  const historyTokenPrice = {
    valid1: 5000
  };
  const validTokenPair = {
    valid1: {
      timestamp: "2021-09-05T04:09:27.479Z",
      asset0: {
        contractAddress: "uusd",
        verified: true,
        name: "TerraUSD",
        symbol: "UST",
        circSupply: 17279124023251228,
        circSupplyAPI: "<some_url>",
        timestamp: "1970-01-01T00:00:00.000Z",
        totalSupply: 17279124027790512,
        poolAmount: 1111417304686,
        volume24h: 15600000000,
        volume7d: 238632021673
      },
      asset1: {
        contractAddress: "token5",
        icon: "<some_url>",
        verified: true,
        name: "token 5",
        protocol: "Anchor",
        symbol: "t5",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 10000000000,
        circSupply: 100000000000,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 500000,
        volume24h: 1,
        volume7d: 1
      },
      defaultBase: "asset1",
      dex: "Terraswap"
    }
  };
  let mockAxios = jest.fn();
  beforeEach(async () => {
    mockAxios = jest.fn()
      .mockResolvedValueOnce({
        data: validTokenPair
      })
      .mockResolvedValueOnce({
        data: latestTokenPrice
      })
      .mockResolvedValueOnce({
        data: historyTokenPrice
      });
    axios.get = mockAxios;
    axios.CancelToken.source = jest.fn().mockReturnValue({
      token: "token",
      cancel: jest.fn()
    });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
  });
  it("shows the index number", () => {
    expect(screen.getByText("#1")).toBeInTheDocument();
  });
  it("shows the pool logo", () => {
    expect(screen.getByAltText("token-logo-t5")).toBeInTheDocument();
  });
  it("shows the Mkt Cap", () => {
    expect(screen.getByText("Mkt Cap")).toBeInTheDocument();
    expect(screen.getByText("5B UST")).toBeInTheDocument();
  });
  it("shows the pair name", () => {
    expect(screen.getByText("t5/UST")).toBeInTheDocument();
  });
  it("shows the pair price", () => {
    expect(screen.getByText("50000 UST")).toBeInTheDocument();
  });
  it("shows the 24hr volume", () => {
    expect(screen.getByText("Vol (24h)")).toBeInTheDocument();
    expect(screen.getByText("15.6K UST")).toBeInTheDocument();
  });
  it("shows the 24hr price change in %", () => {
    expect(screen.getByText("24h: 900.00%")).toBeInTheDocument();
  });
});
