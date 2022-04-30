import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React from "react";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
and clicks on the sort button,
Then user sees the cards sorted by market cap in ascending order.
`;
describe(userStory, () => {
  const latestTokenPrice = {
    valid1: 50000,
    valid2: 50000
  };
  const invalidTokenPair = {
    lowerPoolAmt: {
      timestamp: "2021-09-05T04:09:27.479Z",
      asset0: {
        contractAddress: "uusd",
        verified: true,
        name: "TerraUSD",
        symbol: "UST",
        circSupply: 0,
        circSupplyAPI: "<some_url>",
        timestamp: "1970-01-01T00:00:00.000Z",
        totalSupply: 0,
        poolAmount: 1,
        volume24h: 1,
        volume7d: 1
      },
      asset1: {
        contractAddress: "token1",
        verified: true,
        name: "token 1",
        protocol: "Anchor",
        symbol: "t1",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 500000,
        circSupply: 500000,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 1,
        volume24h: 1,
        volume7d: 1
      },
      defaultBase: "asset1",
      dex: "Terraswap"
    }
  };
  const validTokenPair = {
    valid1: {
      timestamp: "2021-09-05T04:09:27.479Z",
      asset0: {
        contractAddress: "uusd",
        verified: true,
        name: "TerraUSD",
        symbol: "UST",
        circSupply: 0,
        circSupplyAPI: "<some_url>",
        timestamp: "1970-01-01T00:00:00.000Z",
        totalSupply: 0,
        poolAmount: 500000,
        volume24h: 1,
        volume7d: 1
      },
      asset1: {
        contractAddress: "token1",
        verified: true,
        name: "token 1",
        protocol: "Anchor",
        symbol: "t1",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 500000,
        circSupply: 500000,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 500000,
        volume24h: 1,
        volume7d: 1
      },
      defaultBase: "asset1",
      dex: "Terraswap"
    },
    valid2: {
      timestamp: "2021-09-05T04:09:27.479Z",
      asset0: {
        contractAddress: "uusd",
        verified: true,
        name: "TerraUSD",
        symbol: "UST",
        circSupply: 0,
        circSupplyAPI: "<some_url>",
        timestamp: "1970-01-01T00:00:00.000Z",
        totalSupply: 0,
        poolAmount: 500000,
        volume24h: 1,
        volume7d: 1
      },
      asset1: {
        contractAddress: "token2",
        verified: true,
        name: "token 2",
        protocol: "Anchor",
        symbol: "t2",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 100000000000,
        circSupply: 100000000000,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 500000,
        volume24h: 1,
        volume7d: 1
      },
      defaultBase: "asset1",
      dex: "Terraswap"
    },
    valid3: {
      timestamp: "2021-09-05T04:09:27.479Z",
      asset0: {
        contractAddress: "token1",
        verified: true,
        name: "token 1",
        protocol: "Anchor",
        symbol: "t1",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 500000,
        circSupply: 500000,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 5000,
        volume24h: 1,
        volume7d: 1
      },
      asset1: {
        contractAddress: "token3",
        verified: true,
        name: "token 3",
        protocol: "Anchor",
        symbol: "t3",
        website: "<some_url>",
        twitter: "<some_url>",
        telegram: "<some_url>",
        timestamp: "2021-09-02T14:37:40.345Z",
        totalSupply: 100000000000,
        circSupply: 1,
        circSupplyAPI: "<some_url>",
        decimals: 6,
        poolAmount: 1,
        volume24h: 1,
        volume7d: 1
      },
      defaultBase: "asset1",
      dex: "Terraswap"
    }
  };
  beforeEach(async () => {
    axios.get = jest.fn()
      .mockResolvedValueOnce({
        data: {
          ...invalidTokenPair,
          ...validTokenPair
        }
      })
      .mockResolvedValueOnce({
        data: {
          ...latestTokenPrice
        }
      })
      .mockResolvedValueOnce({
        data: {
          ...latestTokenPrice
        }
      });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
    screen.getByTestId("sort-desc");
    userEvent.click(screen.getByTestId("sort-icon"));
  });
  it("shows the cards in the correct order", () => {
    const cards = screen.getAllByTestId(/pool-card/i);
    expect(cards.length).toBe(3);
    expect(cards[0]).toContainElement(screen.getByText(/token 1/i));
    expect(cards[1]).toContainElement(screen.getByText(/token 3/i));
    expect(cards[2]).toContainElement(screen.getByText(/token 2/i));
    expect(screen.getByTestId("sort-asec")).toBeInTheDocument();
  });
});
