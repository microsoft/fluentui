import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { RatingDisplay } from '../RatingDisplay';
import { RatingItem } from './RatingItem';
import type { RatingItemState } from './RatingItem.types';
import { ratingItemClassNames, useRatingItemStyles } from './useRatingItemStyles';

import styles from './RatingItem.module.css';

const indicators = (root: HTMLElement) => root.querySelectorAll<HTMLElement>(`.${styles.indicator}`);

describe('RatingItem', () => {
  isConformant({
    Component: RatingItem,
    displayName: 'RatingItem',
    requiredProps: { value: 1 },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<RatingItem data-testid="root" value={1} />);

    const root = getByTestId('root');

    expect(root.className).toContain(ratingItemClassNames.root);
    expect(root).toHaveClass('fui-rating-item');
    expect(root).toHaveClass('group/fui-rating-item');
    expect(root.classList[0]).toBe('fui-rating-item');
  });

  it('stamps no data attribute and renders no input outside an interactive rating', () => {
    const { getByTestId } = render(<RatingItem data-testid="root" value={1} color="brand" size="large" />);

    const root = getByTestId('root');

    expect(root.hasAttribute('data-appearance')).toBe(false);
    expect(root.hasAttribute('data-color')).toBe(false);
    expect(root.hasAttribute('data-size')).toBe(false);
    expect(root.querySelector('input')).toBeNull();
  });

  it('renders only the unselected indicator with no rating display above it', () => {
    // Outside a provider the item reads the base package's default context, whose `value` is
    // undefined — so the fill width is 0 and the selected indicator never renders.
    const { getByTestId } = render(<RatingItem data-testid="root" value={1} />);

    const root = getByTestId('root');

    expect(indicators(root)).toHaveLength(1);
    expect(indicators(root)[0]).toHaveClass(styles['unselected-neutral']);
    expect(indicators(root)[0]).toHaveClass(styles.unselected);
    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass(styles.medium);
  });

  it('resolves colour and size from the owning RatingDisplay, then lets an own prop win', () => {
    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const { getByTestId } = render(
      <RatingDisplay color="brand" size="large" value={2}>
        <RatingItem data-testid="inherit" value={1} />
        <RatingItem data-testid="override" value={1} color="marigold" size="small" />
        <RatingItem data-testid="unselected" value={5} />
      </RatingDisplay>,
    );

    const inherit = getByTestId('inherit');

    expect(inherit).toHaveClass(styles.large);
    expect(indicators(inherit)[0]).toHaveClass(styles['selected-brand']);

    const override = getByTestId('override');

    expect(override).toHaveClass(styles.small);
    expect(override).not.toHaveClass(styles.large);
    expect(indicators(override)[0]).toHaveClass(styles['selected-marigold']);

    const unselected = getByTestId('unselected');

    expect(indicators(unselected)[0]).toHaveClass(styles['unselected-brand']);
    expect(indicators(unselected)[0]).toHaveClass(styles.unselected);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled',
      color: 'neutral',
      components: { root: 'span', selectedIcon: 'div', unselectedIcon: 'div' },
      iconFillWidth: 0.5,
      root: { as: 'span', className: 'consumer' },
      selectedIcon: { className: 'consumer-selected' },
      size: 'medium',
      step: 0.5,
      unselectedIcon: { className: 'consumer-unselected' },
      value: 1,
    } as unknown as RatingItemState;

    const styled = useRatingItemStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.selectedIcon!.className).toBe('consumer-selected');
    expect(state.unselectedIcon!.className).toBe('consumer-unselected');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(ratingItemClassNames.root);
    expect(styled.selectedIcon!.className).toContain('consumer-selected');
    expect(styled.selectedIcon!.className).toContain(styles['lower-half']);
    expect(styled.unselectedIcon!.className).toContain('consumer-unselected');
    expect(styled.unselectedIcon!.className).toContain(styles['upper-half']);
  });
});
