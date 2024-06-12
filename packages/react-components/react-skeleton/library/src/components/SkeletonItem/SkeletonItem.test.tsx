import * as React from 'react';
import { render } from '@testing-library/react';
import { SkeletonItem } from './SkeletonItem';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonItem', () => {
  isConformant({
    Component: SkeletonItem,
    displayName: 'SkeletonItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SkeletonItem>Default SkeletonItem</SkeletonItem>);
    expect(result.container).toMatchSnapshot();
  });
});
