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
    const { getByRole } = render(<Skeleton>Default Skeleton</Skeleton>);
    const skeleton = getByRole('progressbar');

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveTextContent('Default Skeleton');
  });
});
