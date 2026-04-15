import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Input } from './Input';

describe('Input', () => {
  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Input placeholder="Input your text" />);
    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Input your text');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<Input disabled placeholder="Disabled" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });
});
