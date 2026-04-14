import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  isConformant({
    Component: Skeleton,
    displayName: 'Skeleton',
  });

  it('renders a default state', () => {
    const result = render(<Skeleton>Default Skeleton</Skeleton>);
    expect(result.container).toMatchSnapshot();
  });
});
