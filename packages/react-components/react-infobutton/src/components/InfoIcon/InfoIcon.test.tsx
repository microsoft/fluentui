import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoIcon } from './InfoIcon';
import { isConformant } from '../../testing/isConformant';

describe('InfoIcon', () => {
  isConformant({
    Component: InfoIcon,
    displayName: 'InfoIcon',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoIcon>Default InfoIcon</InfoIcon>);
    expect(result.container).toMatchSnapshot();
  });
});
