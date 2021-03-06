import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the buttons 'Top' and 'All'.
`;
describe(userStory, () => {
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: {} });
    render(<App />);
    await waitFor(() => screen.getByText("Loaded"));
  });
  it("shows the buttons", () => {
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
