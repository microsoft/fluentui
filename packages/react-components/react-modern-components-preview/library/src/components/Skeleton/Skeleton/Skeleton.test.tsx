import * as React from 'react';
import { render, within } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { skeletonClassNames } from './useSkeletonStyles.styles';
import { SkeletonItem } from '../SkeletonItem/SkeletonItem';
import { skeletonItemClassNames } from '../SkeletonItem/useSkeletonItemStyles.styles';

describe('Skeleton', () => {
  it('renders defaults and stable class names', () => {
    const { getByRole } = render(
      <Skeleton>
        <SkeletonItem />
      </Skeleton>,
    );
    const root = getByRole('progressbar');
    const item = root.firstElementChild;

    expect(root).toHaveAttribute('data-animation', 'wave');
    expect(root).toHaveAttribute('data-appearance', 'opaque');
    expect(root).toHaveClass(skeletonClassNames.root);
    expect(item).toHaveAttribute('data-animation', 'wave');
    expect(item).toHaveAttribute('data-appearance', 'opaque');
    expect(item).toHaveAttribute('data-size', '16');
    expect(item).toHaveAttribute('data-shape', 'rectangle');
    expect(item).toHaveClass(skeletonItemClassNames.root);
  });

  it('provides visual props to items and allows item overrides', () => {
    const { getByRole } = render(
      <Skeleton animation="pulse" appearance="translucent" shape="circle" size={40}>
        <SkeletonItem data-testid="inherited" />
        <SkeletonItem data-testid="overridden" animation="wave" appearance="opaque" shape="square" size={24} />
      </Skeleton>,
    );
    const root = getByRole('progressbar');

    expect(within(root).getByTestId('inherited')).toHaveAttribute('data-animation', 'pulse');
    expect(within(root).getByTestId('inherited')).toHaveAttribute('data-appearance', 'translucent');
    expect(within(root).getByTestId('inherited')).toHaveAttribute('data-shape', 'circle');
    expect(within(root).getByTestId('inherited')).toHaveAttribute('data-size', '40');
    expect(within(root).getByTestId('overridden')).toHaveAttribute('data-animation', 'wave');
    expect(within(root).getByTestId('overridden')).toHaveAttribute('data-appearance', 'opaque');
    expect(within(root).getByTestId('overridden')).toHaveAttribute('data-shape', 'square');
    expect(within(root).getByTestId('overridden')).toHaveAttribute('data-size', '24');
  });

  it('preserves consumer classes', () => {
    const { getByRole, getByTestId } = render(
      <Skeleton className="skeleton-class">
        <SkeletonItem className="item-class" data-testid="item" />
      </Skeleton>,
    );

    expect(getByRole('progressbar')).toHaveClass('skeleton-class');
    expect(getByTestId('item')).toHaveClass('item-class');
  });
});
