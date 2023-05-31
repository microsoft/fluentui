import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoTip } from './InfoTip';
import { isConformant } from '../../testing/isConformant';

describe('InfoTip', () => {
  isConformant({
    Component: InfoTip,
    displayName: 'InfoTip',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoTip>Default InfoTip</InfoTip>);
    expect(result.container).toMatchSnapshot();
  });
});
