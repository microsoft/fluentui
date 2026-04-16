import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Textarea placeholder="Default Textarea" />);
    const textarea = getByRole('textbox');

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Default Textarea');
  });
});
