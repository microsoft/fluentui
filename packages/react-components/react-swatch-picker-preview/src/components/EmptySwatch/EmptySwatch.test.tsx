import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { EmptySwatch } from './EmptySwatch';

describe('EmptySwatch', () => {
  isConformant({
    Component: EmptySwatch,
    displayName: 'EmptySwatch',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<EmptySwatch>Default EmptySwatch</EmptySwatch>);
    expect(result.container).toMatchSnapshot();
  });
});
