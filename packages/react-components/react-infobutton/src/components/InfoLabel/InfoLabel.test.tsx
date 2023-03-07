import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoLabel } from './InfoLabel';
import { isConformant } from '../../testing/isConformant';

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoLabel>Default InfoLabel</InfoLabel>);
    expect(result.container).toMatchSnapshot();
  });
});
