import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  isConformant({
    Component: ProgressBar,
    displayName: 'ProgressBar',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<ProgressBar>Default ProgressBar</ProgressBar>);
    const progressbar = getByRole('progressbar');

    expect(progressbar).toBeInTheDocument();
  });

  it('renders the bar with correct width when value is provided', () => {
    const { getByRole } = render(<ProgressBar value={0.5} max={1} />);
    const progressbar = getByRole('progressbar');
    const bar = progressbar.firstElementChild!;

    expect(bar).toHaveStyle({ width: '50%' });
  });
});
