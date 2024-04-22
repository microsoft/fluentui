import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverFooter } from './TeachingPopoverFooter';

describe('TeachingPopoverFooter', () => {
  isConformant({
    Component: TeachingPopoverFooter,
    displayName: 'TeachingPopoverFooter',

    requiredProps: {
      primary: 'Primary',
      secondary: 'Secondary',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverFooter primary="Primary" secondary="Secondary">
        Default TeachingPopoverFooter
      </TeachingPopoverFooter>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
