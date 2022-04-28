import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the sort icon and the button named 'Marketcap'.
`;
describe(userStory, () => {
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: {} });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
  });
  it("shows the buttons", () => {
    expect(screen.getByTestId(/sort-icon/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Cap/i)).toBeInTheDocument();
  });
});
