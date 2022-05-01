import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the Connect Wallet button.
`;
describe(userStory, () => {
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: {} });
    axios.CancelToken.source = jest.fn().mockReturnValue({
      token: "token",
      cancel: jest.fn()
    });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
  });
  it("shows the button", () => {
    expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
  });
});
