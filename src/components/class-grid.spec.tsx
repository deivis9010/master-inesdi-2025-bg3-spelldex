import { render, screen } from "@testing-library/react";
import { ClassGrid } from "./class-grid";

describe("<ClassGrid />", () => {
  it('renders the grid: match snapshot', () => {
    const mockOnClick = jest.fn();
    const mockHighlight = jest.fn();
    
    render(<ClassGrid onClick={mockOnClick} highlight={mockHighlight} />);

    const section = screen.getByRole("grid", {
      name: "Class Grid",
    });
    expect(section).toBeInTheDocument();
    expect(section).toMatchSnapshot();
  });
});
