import * as React from 'react';
import { render } from '@testing-library/react';
import { SkeletonCircle } from './SkeletonCircle';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonCircle', () => {
  isConformant({
    Component: SkeletonCircle,
    displayName: 'SkeletonCircle',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SkeletonCircle>Default SkeletonCircle</SkeletonCircle>);
    expect(result.container).toMatchSnapshot();
  });
});
