import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { Skeleton } from '../Skeleton';
import { SkeletonItem } from './SkeletonItem';
import type { SkeletonItemState } from './SkeletonItem.types';
import { skeletonItemClassNames, useSkeletonItemStyles } from './useSkeletonItemStyles';

import styles from './SkeletonItem.module.css';

describe('SkeletonItem', () => {
  isConformant({
    Component: SkeletonItem,
    displayName: 'SkeletonItem',
  });

  it('stamps the four look props and the marker class', () => {
    const { getByTestId } = render(
      <>
        <SkeletonItem data-testid="default" />
        <SkeletonItem data-testid="custom" animation="pulse" appearance="translucent" shape="circle" size={48} />
      </>,
    );

    const fallback = getByTestId('default');

    expect(fallback.getAttribute('data-animation')).toBe('wave');
    expect(fallback.getAttribute('data-appearance')).toBe('opaque');
    expect(fallback.getAttribute('data-shape')).toBe('rectangle');
    expect(fallback.getAttribute('data-size')).toBe('16');
    expect(fallback.className).toContain(skeletonItemClassNames.root);
    expect(fallback).toHaveClass('fui-skeleton-item');
    expect(fallback).toHaveClass('group/fui-skeleton-item');
    expect(fallback.classList[0]).toBe('fui-skeleton-item');

    const custom = getByTestId('custom');

    expect(custom.getAttribute('data-animation')).toBe('pulse');
    expect(custom.getAttribute('data-appearance')).toBe('translucent');
    expect(custom.getAttribute('data-shape')).toBe('circle');
    expect(custom.getAttribute('data-size')).toBe('48');
  });

  it('resolves each dimension against the group, then lets an own prop win', () => {
    const { getByTestId } = render(
      <Skeleton animation="pulse" appearance="translucent" size={48} shape="circle">
        <SkeletonItem data-testid="inherit" />
        <SkeletonItem data-testid="override" animation="wave" size={92} />
        <SkeletonItem data-testid="override-look" appearance="opaque" shape="square" />
        <Skeleton>
          <SkeletonItem data-testid="nested" />
        </Skeleton>
      </Skeleton>,
    );

    const inherit = getByTestId('inherit');

    expect(inherit.getAttribute('data-animation')).toBe('pulse');
    expect(inherit.getAttribute('data-appearance')).toBe('translucent');
    expect(inherit.getAttribute('data-size')).toBe('48');
    expect(inherit.getAttribute('data-shape')).toBe('circle');

    const override = getByTestId('override');

    expect(override.getAttribute('data-animation')).toBe('wave');
    expect(override.getAttribute('data-appearance')).toBe('translucent');
    expect(override.getAttribute('data-size')).toBe('92');
    expect(override.getAttribute('data-shape')).toBe('circle');

    const overrideLook = getByTestId('override-look');

    expect(overrideLook.getAttribute('data-animation')).toBe('pulse');
    expect(overrideLook.getAttribute('data-appearance')).toBe('opaque');
    expect(overrideLook.getAttribute('data-size')).toBe('48');
    expect(overrideLook.getAttribute('data-shape')).toBe('square');

    // A nested Skeleton passes animation and appearance through but resets size and shape.
    const nested = getByTestId('nested');

    expect(nested.getAttribute('data-animation')).toBe('pulse');
    expect(nested.getAttribute('data-appearance')).toBe('translucent');
    expect(nested.getAttribute('data-size')).toBe('16');
    expect(nested.getAttribute('data-shape')).toBe('rectangle');
  });

  it('merges the root, block and consumer classes on a span root', () => {
    const { getByTestId } = render(
      <>
        <SkeletonItem data-testid="span" className="consumer" as="span" />
        <SkeletonItem data-testid="div" />
      </>,
    );

    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const span = getByTestId('span');

    expect(span.tagName).toBe('SPAN');
    expect(span).toHaveClass(styles.root);
    expect(span).toHaveClass(styles.block);
    expect(span).toHaveClass('consumer');
    expect(getByTestId('div')).not.toHaveClass(styles.block);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      animation: 'wave',
      appearance: 'opaque',
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
      shape: 'rectangle',
      size: 16,
    } as unknown as SkeletonItemState;

    const styled = useSkeletonItemStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.root).not.toHaveProperty('data-shape');
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(skeletonItemClassNames.root);
  });
});
