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
    const result = render(<ProgressBar>Default ProgressBar</ProgressBar>);
    expect(result.container).toMatchSnapshot();
  });
});
