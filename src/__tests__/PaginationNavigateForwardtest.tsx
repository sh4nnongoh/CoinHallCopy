import React from "react";
import {
  render, waitFor, screen
} from "@testing-library/react";
import axios from "axios";
import _ from "lodash";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { PairsTransport } from "../contexts/CoinHallProvider";
const userStory = `
Given no inital state,
When user navigates to the web page,
and clicks on the Next button,
Then user sees the relevant cards.
`;
describe(userStory, () => {
  const generatePools = (list: string[]): PairsTransport => {
    const obj: PairsTransport = {};
    list.forEach((i, index) => {
      obj[i] = {
        timestamp: "",
        asset0: {
          contractAddress: "uusd",
          verified: true,
          name: "TerraUSD",
          symbol: "UST",
          circSupply: 0,
          circSupplyAPI: "<some_url>",
          timestamp: "",
          totalSupply: 0,
          poolAmount: 500000,
          volume24h: 1,
          volume7d: 1
        },
        asset1: {
          contractAddress: i,
          verified: true,
          name: i,
          protocol: "Anchor",
          symbol: i,
          website: "<some_url>",
          twitter: "<some_url>",
          telegram: "<some_url>",
          timestamp: "2021-09-02T14:37:40.345Z",
          totalSupply: 500000,
          circSupply: 500000,
          circSupplyAPI: "<some_url>",
          decimals: 6,
          poolAmount: index + 1,
          volume24h: 1,
          volume7d: 1
        },
        defaultBase: "asset1",
        dex: "Terraswap"
      };
    });
    return obj;
  };
  beforeEach(async () => {
    const data = generatePools(_.range(1, 26).map((i) => `t${i}`));
    axios.get = jest.fn()
      .mockResolvedValueOnce({ data })
      .mockResolvedValueOnce({ data: {} })
      .mockResolvedValueOnce({ data: {} });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
    userEvent.click(screen.getByText("Next >"));
  });
  it("shows the 25th card", () => {
    const cards = screen.getAllByTestId(/pool-card/i);
    expect(cards.length).toBe(1);
    _.range(1, 25).forEach((i) => {
      expect(screen.queryByText(`t${i}`)).not.toBeInTheDocument();
    });
    expect(screen.getByText("t25")).toBeInTheDocument();
  });
});
