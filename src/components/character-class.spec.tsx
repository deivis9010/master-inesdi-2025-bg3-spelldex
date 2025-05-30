import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CharacterClass } from './character-class';

describe('CharacterClass', () => {
  it('renders the class name and icon', () => {
    render(<CharacterClass name="Wizard" slug="wizard" />);
    expect(screen.getByText('Wizard')).toBeInTheDocument();
    const img = screen.getByAltText('Wizard');
    expect(img).toHaveAttribute('src', '/assets/icons/classes/wizard.png');
  });
})
