import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';

describe('TeachingPopoverSurface', () => {
  // TeachingPopoverSurface is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';
  // also include an aria-label to prevent warnings in debug mode
  const props = { 'data-testid': testid, 'aria-label': 'test' };

  isConformant({
    Component: TeachingPopoverSurface,
    displayName: 'TeachingPopoverSurface',
    requiredProps: props as TeachingPopoverSurfaceProps,
    getTargetElement: result => result.getByTestId(testid),
    disabledTests: [
      // Arrow slot is optional
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverSurface>Default TeachingPopoverSurface</TeachingPopoverSurface>);
    expect(result.container).toMatchSnapshot();
  });
});
