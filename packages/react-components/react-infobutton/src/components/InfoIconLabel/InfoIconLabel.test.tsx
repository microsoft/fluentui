import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoIconLabel } from './InfoIconLabel';
import { isConformant } from '../../testing/isConformant';

describe('InfoIconLabel', () => {
  isConformant({
    Component: InfoIconLabel,
    displayName: 'InfoIconLabel',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoIconLabel>Default InfoIconLabel</InfoIconLabel>);
    expect(result.container).toMatchSnapshot();
  });
});
