import * as React from 'react';
import { render } from '@testing-library/react';
import { EmptySwatch } from './EmptySwatch';
import { emptySwatchClassNames } from './useEmptySwatchStyles.styles';

describe('EmptySwatch', () => {
  it('renders visual defaults and preserves consumer classes', () => {
    const { getByRole } = render(<EmptySwatch aria-label="No color" className="custom-root" />);
    const swatch = getByRole('radio');

    expect(swatch).toHaveClass(emptySwatchClassNames.root, 'custom-root');
    expect(swatch).toHaveAttribute('data-size', 'medium');
    expect(swatch).toHaveAttribute('data-shape', 'square');
  });
});
