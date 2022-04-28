import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the product logo on the navbar
`;
describe(userStory, () => {
  render(<App />);
  it("shows the product logo", () => {
    expect(screen.getByTestId(/logo/i)).toBeInTheDocument();
  });
});
