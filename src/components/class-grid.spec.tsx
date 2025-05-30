import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ClassGrid } from './class-grid';

describe('ClassGrid', () => {
  it('renders the class name and icon', () => {
    render(<ClassGrid />);
    expect(screen.getByText('Wizard')).toBeInTheDocument();
    const img = screen.getByAltText('Wizard');
    expect(img).toHaveAttribute('src', 'src/assets/icons/classes/wizard.png');
  });
});
