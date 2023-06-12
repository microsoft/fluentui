import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoButtonLabel } from './InfoButtonLabel';
import { isConformant } from '../../testing/isConformant';

describe('InfoButtonLabel', () => {
  isConformant({
    Component: InfoButtonLabel,
    displayName: 'InfoButtonLabel',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoButtonLabel>Default InfoButtonLabel</InfoButtonLabel>);
    expect(result.container).toMatchSnapshot();
  });
});
