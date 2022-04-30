import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
and sees the loading view,
Then does not see the loading view,
and axios is called with the right props.
`;
describe(userStory, () => {
  let mockAxios = jest.fn();
  beforeEach(async () => {
    mockAxios = jest.fn().mockResolvedValue({ data: {} });
    axios.get = mockAxios;
    axios.CancelToken.source = jest.fn().mockReturnValue({
      token: "token",
      cancel: jest.fn()
    });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
  });
  it("calls axios with the right props", () => {
    expect(mockAxios).toHaveBeenCalledTimes(3);
    expect(mockAxios).toHaveBeenNthCalledWith(1, "/v1/charts/terra/pairs", { cancelToken: "token" });
    expect(mockAxios).toHaveBeenNthCalledWith(2, "/charts/terra/prices/latest", { cancelToken: "token" });
    expect(mockAxios).toHaveBeenNthCalledWith(3, "/charts/terra/prices/historical", { cancelToken: "token" });
  });
  it("does not show the loading view", () => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
  it("starts the timer", () => {
    expect(screen.getByText("Timer Started")).toBeInTheDocument();
  });
});
