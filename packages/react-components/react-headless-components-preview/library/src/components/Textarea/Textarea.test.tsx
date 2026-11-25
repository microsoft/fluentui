import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
    requiredProps: { 'aria-label': 'Text' },
  });

  it('renders a default state', () => {
    const { container, getByRole } = render(<Textarea placeholder="Default Textarea" />);
    const root = container.firstElementChild!;
    const textarea = getByRole('textbox');

    expect(root).not.toHaveAttribute('data-invalid');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Default Textarea');
  });

  it('exposes invalid state on the root while preserving aria-invalid on the textarea', () => {
    const { container, getByRole } = render(<Textarea aria-invalid />);
    const root = container.firstElementChild!;
    const textarea = getByRole('textbox');

    expect(root).toHaveAttribute('data-invalid', '');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with data-readonly when read-only', () => {
    const { container } = render(<Textarea readOnly />);

    expect(container.firstElementChild!).toHaveAttribute('data-readonly');
  });

  it('does not render data-readonly by default', () => {
    const { container } = render(<Textarea />);

    expect(container.firstElementChild!).not.toHaveAttribute('data-readonly');
  });
});
