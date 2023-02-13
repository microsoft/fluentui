import * as React from 'react';
import { render } from '@testing-library/react';
import { SkeletonLine } from './SkeletonLine';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonLine', () => {
  isConformant({
    Component: SkeletonLine,
    displayName: 'SkeletonLine',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SkeletonLine>Default SkeletonLine</SkeletonLine>);
    expect(result.container).toMatchSnapshot();
  });
});
