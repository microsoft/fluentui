import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { CounterBadge } from './CounterBadge';
import type { CounterBadgeState } from './CounterBadge.types';
import { counterBadgeClassNames, useCounterBadgeStyles } from './useCounterBadgeStyles';

import styles from './CounterBadge.module.css';
import badgeStyles from '../Badge/Badge.module.css';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
  });

  it('stamps both marker pairs, its own first', () => {
    const { getByTestId } = render(<CounterBadge data-testid="root" count={4} />);

    const root = getByTestId('root');

    expect(root.className).toContain(counterBadgeClassNames.root);
    expect(root).toHaveClass('fui-counter-badge');
    expect(root).toHaveClass('group/fui-counter-badge');
    expect(root).toHaveClass('fui-badge');
    expect(root).toHaveClass('group/fui-badge');
    expect(root.classList[0]).toBe('fui-counter-badge');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<CounterBadge data-testid="root" count={4} />);

    expect(classOccurrences(getByTestId('root'), styles.root)).toBe(2);
  });

  it('keeps a consumer className on the root', () => {
    const { getByTestId } = render(<CounterBadge data-testid="root" count={4} className="consumer" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(classOccurrences(root, 'consumer')).toBe(1);
  });

  it('leaves data-count/-dot/-hidden/-overflowed to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <CounterBadge data-testid="hidden" />
        <CounterBadge data-testid="counted" count={4} />
        <CounterBadge data-testid="dotted" count={4} dot />
        <CounterBadge data-testid="overflowed" count={150} overflowCount={99} />
      </>,
    );

    const hidden = getByTestId('hidden');

    expect(hidden.getAttribute('data-count')).toBe('0');
    expect(hidden.hasAttribute('data-hidden')).toBe(true);
    expect(hidden.hasAttribute('data-dot')).toBe(false);

    const counted = getByTestId('counted');

    expect(counted.getAttribute('data-count')).toBe('4');
    expect(counted.hasAttribute('data-hidden')).toBe(false);

    expect(getByTestId('dotted').hasAttribute('data-dot')).toBe(true);
    expect(getByTestId('overflowed').hasAttribute('data-overflowed')).toBe(true);
  });

  it('keeps data-size/-empty and the appearance/color classes from useBadgeStyles', () => {
    const { getByTestId } = render(<CounterBadge data-testid="root" appearance="ghost" size="large" count={4} />);

    const root = getByTestId('root');

    expect(root.getAttribute('data-size')).toBe('large');
    expect(root.hasAttribute('data-empty')).toBe(false);
    expect(root).toHaveClass(badgeStyles.ghost);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled',
      color: 'brand',
      components: { root: 'div', icon: 'span' },
      root: { as: 'div', children: '4', className: 'consumer', 'data-count': '4' },
      shape: 'circular',
      size: 'medium',
    } as unknown as CounterBadgeState;

    const styled = useCounterBadgeStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root['data-count']).toBe('4');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(counterBadgeClassNames.root);
    expect(styled.root['data-count']).toBe('4');
  });
});
