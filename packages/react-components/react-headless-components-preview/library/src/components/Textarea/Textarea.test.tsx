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
});
