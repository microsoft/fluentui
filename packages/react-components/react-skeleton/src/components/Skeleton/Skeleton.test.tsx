import * as React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { isConformant } from '../../testing/isConformant';

describe('Skeleton', () => {
  isConformant({
    Component: Skeleton,
    displayName: 'Skeleton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Skeleton>Default Skeleton</Skeleton>);
    expect(result.container).toMatchSnapshot();
  });
});
