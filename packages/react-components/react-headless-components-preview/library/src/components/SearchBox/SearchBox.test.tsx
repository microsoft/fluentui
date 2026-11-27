import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SearchBox } from './SearchBox';
import { Field } from '../Field';

describe('SearchBox', () => {
  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Search' },
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

  it('renders with data-invalid inside an error Field', () => {
    const { container } = render(
      <Field label="Search" validationState="error">
        <SearchBox />
      </Field>,
    );
    const root = container.querySelector('input')!.parentElement!;

    expect(root).toHaveAttribute('data-invalid', '');
  });

  it('does not render data-invalid by default', () => {
    const { container } = render(<SearchBox placeholder="Search..." />);
    const root = container.firstElementChild!;

    expect(root).not.toHaveAttribute('data-invalid');
  });
});
