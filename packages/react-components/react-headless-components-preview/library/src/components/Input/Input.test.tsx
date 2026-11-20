import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Input } from './Input';

describe('Input', () => {
  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Text' },
  });

  it('renders a default state', () => {
    const { container, getByRole } = render(<Input placeholder="Input your text" />);
    const root = container.firstElementChild!;
    const input = getByRole('textbox');

    expect(root).not.toHaveAttribute('data-invalid');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Input your text');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('exposes invalid state on the root while preserving aria-invalid on the input', () => {
    const { container, getByRole } = render(<Input aria-invalid />);
    const root = container.firstElementChild!;
    const input = getByRole('textbox');

    expect(root).toHaveAttribute('data-invalid', '');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<Input disabled placeholder="Disabled" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });

  it('reflects input-slot readonly state on the root', () => {
    const { container, rerender } = render(<Input input={{ readOnly: true }} />);
    expect(container.firstElementChild).toHaveAttribute('data-readonly');
    rerender(<Input input={{ readOnly: false }} />);
    expect(container.firstElementChild).not.toHaveAttribute('data-readonly');
  });
});
