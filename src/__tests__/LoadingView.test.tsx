import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the loading view
`;
describe(userStory, () => {
  render(<App />);
  it("shows the loading view", () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
