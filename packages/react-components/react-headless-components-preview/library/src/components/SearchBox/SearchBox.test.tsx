import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<SearchBox placeholder="Search..." />);
    const input = getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('renders a clear button', () => {
    const { getByRole } = render(<SearchBox placeholder="Search..." />);
    const clearButton = getByRole('button', { name: 'clear' });

    expect(clearButton).toBeInTheDocument();
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<SearchBox disabled placeholder="Search..." />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });
});
