import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
    requiredProps: { 'aria-label': 'Empty' },
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders a native radio swatch with state attributes', () => {
    const swatch = render(<EmptySwatch aria-label="Empty" disabled />).getByRole('radio');

    expect(swatch).toHaveAttribute('aria-checked', 'false');
    expect(swatch).not.toHaveAttribute('data-selected');
    expect(swatch).toHaveAttribute('data-disabled');
  });
});
