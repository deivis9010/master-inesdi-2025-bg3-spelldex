import { render, screen } from "@testing-library/react";
import { App } from "./app";

describe("<App />", () => {
  it("renders: match snapshot", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(main).toMatchSnapshot();
  });
});
