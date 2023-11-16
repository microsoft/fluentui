import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';

describe('TeachingPopoverSurface', () => {
  isConformant({
    Component: TeachingPopoverSurface,
    displayName: 'TeachingPopoverSurface',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverSurface>Default TeachingPopoverSurface</TeachingPopoverSurface>);
    expect(result.container).toMatchSnapshot();
  });
});
