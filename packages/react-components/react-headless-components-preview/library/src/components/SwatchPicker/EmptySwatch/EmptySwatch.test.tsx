import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({ Component: EmptySwatch, displayName: 'EmptySwatch', disabledTests: ['has-top-level-file-extra'] });

  it('renders a native radio swatch', () => {
    expect(render(<EmptySwatch aria-label="Empty" />).getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  });
});
