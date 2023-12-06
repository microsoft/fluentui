import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverActions } from './TeachingPopoverActions';

describe('TeachingPopoverActions', () => {
  isConformant({
    Component: TeachingPopoverActions,
    displayName: 'TeachingPopoverActions',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverActions>Default TeachingPopoverActions</TeachingPopoverActions>);
    expect(result.container).toMatchSnapshot();
  });
});
