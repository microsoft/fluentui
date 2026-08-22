import * as React from 'react';
import { render } from '@testing-library/react';

import { Skeleton } from './Skeleton';
import { isConformant } from '../../testing/isConformant';
import type { SkeletonState } from './Skeleton.types';
import { skeletonClassNames, useSkeletonStyles } from './useSkeletonStyles';

import styles from './Skeleton.module.css';

describe('Skeleton', () => {
  isConformant({
    Component: Skeleton,
    displayName: 'Skeleton',
    requiredProps: { children: 'Skeleton' },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<Skeleton data-testid="root">Skeleton</Skeleton>);

    const root = getByTestId('root');

    expect(root.className).toContain(skeletonClassNames.root);
    expect(root).toHaveClass('fui-skeleton');
    expect(root).toHaveClass('group/fui-skeleton');
    expect(root.classList[0]).toBe('fui-skeleton');
  });

  it('stamps no data attribute — the group resolves in JS, not in CSS', () => {
    const { getByTestId } = render(
      <Skeleton data-testid="root" animation="pulse" appearance="translucent" size={48} shape="circle">
        Skeleton
      </Skeleton>,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-animation')).toBe(false);
    expect(root.hasAttribute('data-appearance')).toBe(false);
    expect(root.hasAttribute('data-size')).toBe(false);
    expect(root.hasAttribute('data-shape')).toBe(false);
  });

  it('keeps the headless accessibility contract intact', () => {
    const { getByTestId } = render(<Skeleton data-testid="root">Skeleton</Skeleton>);

    const root = getByTestId('root');

    expect(root.getAttribute('role')).toBe('progressbar');
    expect(root.getAttribute('aria-busy')).toBe('true');
  });

  it('adds the block class only when the root renders as a span', () => {
    const { getByTestId } = render(
      <>
        <Skeleton data-testid="div">Skeleton</Skeleton>
        <Skeleton data-testid="span" as="span">
          Skeleton
        </Skeleton>
      </>,
    );

    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    expect(getByTestId('span').tagName).toBe('SPAN');
    expect(getByTestId('span')).toHaveClass(styles.block);
    expect(getByTestId('div')).not.toHaveClass(styles.block);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      animation: 'wave',
      appearance: 'opaque',
      components: { root: 'div' },
      root: { as: 'span', children: 'Skeleton', className: 'consumer' },
    } as unknown as SkeletonState;

    const styled = useSkeletonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(skeletonClassNames.root);
  });
});
