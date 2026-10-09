import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Rating } from '../Rating/Rating';
import { RatingDisplay } from '../RatingDisplay/RatingDisplay';
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
    expect(root.querySelector(`.${styles.input}`)).toBeNull();
  });

  it('renders only the unselected indicator with no rating display above it', () => {
    // Outside a provider the item reads the base package's default context, whose `value` is
    // undefined — so the fill width is 0 and the selected indicator never renders.
    const { getByTestId } = render(<RatingItem data-testid="root" value={1} />);

    const root = getByTestId('root');

    expect(indicators(root)).toHaveLength(1);
    expect(indicators(root)[0]).toHaveClass(styles.unselectedNeutral);
    expect(indicators(root)[0]).toHaveClass(styles.unselected);
    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass(styles.medium);
  });

  it('resolves colour and size from the owning RatingDisplay, then lets an own prop win', () => {
    // The css-module proxy answers every key — see testing/classOccurrences.ts.
    const { getByTestId } = render(
      <RatingDisplay color="brand" size="large" value={2}>
        <RatingItem data-testid="inherit" value={1} />
        <RatingItem data-testid="override" value={1} color="marigold" size="small" />
        <RatingItem data-testid="unselected" value={5} />
      </RatingDisplay>,
    );

    const inherit = getByTestId('inherit');

    expect(inherit).toHaveClass(styles.large);
    expect(indicators(inherit)[0]).toHaveClass(styles.selectedBrand);

    const override = getByTestId('override');

    expect(override).toHaveClass(styles.small);
    expect(override).not.toHaveClass(styles.large);
    expect(indicators(override)[0]).toHaveClass(styles.selectedMarigold);

    const unselected = getByTestId('unselected');

    expect(indicators(unselected)[0]).toHaveClass(styles.unselectedBrand);
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
    expect(styled.selectedIcon!.className).toContain(styles.lowerHalf);
    expect(styled.unselectedIcon!.className).toContain('consumer-unselected');
    expect(styled.unselectedIcon!.className).toContain(styles.upperHalf);
  });

  it('keeps the muted unselected look for every colour inside a rating display', () => {
    const colors = ['neutral', 'brand', 'marigold'] as const;

    for (const color of colors) {
      const { getByTestId } = render(
        <RatingDisplay color={color} value={0}>
          <RatingItem data-testid={color} value={1} />
        </RatingDisplay>,
      );

      const item = getByTestId(color);

      expect(indicators(item)[0]).toHaveClass(styles[`unselected-${color}`]);
      expect(indicators(item)[0]).toHaveClass(styles.unselected);
    }
  });

  it('draws the unselected glyph in the selected colour family inside an interactive rating', () => {
    const { getByTestId } = render(
      <Rating value={0}>
        <RatingItem data-testid="neutral" value={1} />
      </Rating>,
    );

    const neutral = getByTestId('neutral');

    expect(indicators(neutral)[0]).not.toHaveClass(styles.unselected);
    expect(indicators(neutral)[0]).not.toHaveClass(styles.unselectedNeutral);
    expect(indicators(neutral)[0]).not.toHaveClass(styles.selectedNeutral);

    const brand = render(
      <Rating color="brand" value={0}>
        <RatingItem data-testid="brand" value={1} />
      </Rating>,
    ).getByTestId('brand');

    expect(indicators(brand)[0]).toHaveClass(styles.selectedBrand);
    expect(indicators(brand)[0]).not.toHaveClass(styles.unselected);
  });

  it('decorates the inputs an interactive rating renders', () => {
    const whole = render(
      <Rating step={1} value={0}>
        <RatingItem data-testid="item" value={1} />
      </Rating>,
    ).getByTestId('item');

    const wholeInputs = whole.querySelectorAll<HTMLInputElement>('input');

    expect(wholeInputs).toHaveLength(1);
    expect(wholeInputs[0]).toHaveClass(styles.input);
    expect(wholeInputs[0]).not.toHaveClass(styles.inputUpperHalf);
    expect(wholeInputs[0]).not.toHaveClass(styles.inputLowerHalf);

    const half = render(
      <Rating step={0.5} value={0}>
        <RatingItem data-testid="half-item" value={1} />
      </Rating>,
    ).getByTestId('half-item');

    const halfInputs = half.querySelectorAll<HTMLInputElement>('input');

    expect(halfInputs).toHaveLength(2);
    expect(halfInputs[0]).toHaveClass(styles.input);
    expect(halfInputs[0]).toHaveClass(styles.inputLowerHalf);
    expect(halfInputs[1]).toHaveClass(styles.input);
    expect(halfInputs[1]).toHaveClass(styles.inputUpperHalf);
  });

  it('keeps a consumer className on both input slots', () => {
    const { getByTestId } = render(
      <Rating step={0.5} value={0}>
        <RatingItem
          data-testid="item"
          value={1}
          halfValueInput={{ className: 'consumer-half' }}
          fullValueInput={{ className: 'consumer-full' }}
        />
      </Rating>,
    );

    const [half, full] = Array.from(getByTestId('item').querySelectorAll<HTMLInputElement>('input'));

    expect(half).toHaveClass('consumer-half');
    expect(half).toHaveClass(styles.input);
    expect(full).toHaveClass('consumer-full');
    expect(full).toHaveClass(styles.input);
  });
});
