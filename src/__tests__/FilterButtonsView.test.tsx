import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the buttons 'Top' and 'All'.
`;
describe(userStory, () => {
  render(<App />);
  it("shows the buttons", () => {
    expect(screen.getByText(/Top/i)).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });
});
