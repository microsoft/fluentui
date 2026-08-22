import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';
import type { RatingDisplayState } from './RatingDisplay.types';
import { ratingDisplayClassNames, useRatingDisplayStyles } from './useRatingDisplayStyles';

import itemStyles from './RatingItem/RatingItem.module.css';
import styles from './RatingDisplay.module.css';

const items = (root: HTMLElement) => root.querySelectorAll<HTMLElement>('.fui-rating-item');
const labels = (root: HTMLElement) => root.querySelectorAll<HTMLElement>(`.${styles.label}`);

describe('RatingDisplay', () => {
  isConformant({
    Component: RatingDisplay,
    displayName: 'RatingDisplay',
    // With no slot rendered the headless base hook joins an empty aria-labelledby.
    requiredProps: { value: 4 },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<RatingDisplay data-testid="root" value={4} />);

    const root = getByTestId('root');

    expect(root.className).toContain(ratingDisplayClassNames.root);
    expect(root).toHaveClass('fui-rating-display');
    expect(root).toHaveClass('group/fui-rating-display');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-rating-display');
  });

  it('stamps no data attribute — every look prop resolves to a class', () => {
    const { getByTestId } = render(<RatingDisplay data-testid="root" color="brand" size="large" value={4} count={2} />);

    const root = getByTestId('root');

    expect(root.hasAttribute('data-color')).toBe(false);
    expect(root.hasAttribute('data-size')).toBe(false);
    expect(root.hasAttribute('data-compact')).toBe(false);
    expect(items(root)[0].hasAttribute('data-appearance')).toBe(false);
  });

  it('renders one item per max, and a single item when compact', () => {
    const { getByTestId } = render(
      <>
        <RatingDisplay data-testid="default" value={3} />
        <RatingDisplay data-testid="three" max={3} value={3} />
        <RatingDisplay data-testid="ten" max={10} value={3} />
        <RatingDisplay data-testid="compact" compact value={3} />
      </>,
    );

    expect(items(getByTestId('default'))).toHaveLength(5);
    expect(items(getByTestId('three'))).toHaveLength(3);
    expect(items(getByTestId('ten'))).toHaveLength(10);
    expect(items(getByTestId('compact'))).toHaveLength(1);
  });

  it('lets consumer children replace the generated items', () => {
    const { getByTestId } = render(
      <RatingDisplay data-testid="root" value={3}>
        <span data-testid="own" />
      </RatingDisplay>,
    );

    const root = getByTestId('root');

    expect(items(root)).toHaveLength(0);
    expect(getByTestId('own')).toBeTruthy();
  });

  it('keeps the headless accessibility contract intact', () => {
    const { getByTestId } = render(<RatingDisplay data-testid="root" value={3} count={10} />);

    const root = getByTestId('root');

    expect(root.getAttribute('role')).toBe('img');

    const labelledBy = root.getAttribute('aria-labelledby')!.split(' ');

    expect(labelledBy).toHaveLength(2);

    labelledBy.forEach(id => {
      const label = root.querySelector(`#${id}`);

      expect(label).not.toBeNull();
      expect(label!.tagName).toBe('SPAN');
      expect(label!.getAttribute('aria-hidden')).toBe('true');
    });

    items(root).forEach(item => expect(item.getAttribute('aria-hidden')).toBe('true'));
  });

  it('routes the icon prop into both indicator slots', () => {
    const Custom = (props: React.SVGProps<SVGSVGElement>) => <svg data-custom="" {...props} />;

    const { getByTestId } = render(<RatingDisplay data-testid="root" icon={Custom} max={1} value={0.5} />);

    const item = items(getByTestId('root'))[0];

    expect(item.querySelectorAll(`.${itemStyles.indicator}`)).toHaveLength(2);
    expect(item.querySelectorAll('[data-custom]')).toHaveLength(2);
  });

  it('renders the value and count text only when the props are given', () => {
    const { getByTestId } = render(
      <>
        <RatingDisplay data-testid="bare" />
        <RatingDisplay data-testid="value" value={3.5} />
        <RatingDisplay data-testid="count" count={1160} />
        <RatingDisplay data-testid="both" value={4} count={1160} />
      </>,
    );

    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    expect(labels(getByTestId('bare'))).toHaveLength(0);

    const value = labels(getByTestId('value'));

    expect(value).toHaveLength(1);
    expect(value[0].textContent).toBe('3.5');
    expect(value[0]).toHaveClass(styles.strong);
    expect(value[0]).not.toHaveClass(styles.divider);

    const count = labels(getByTestId('count'));

    expect(count).toHaveLength(1);
    expect(count[0].textContent).toBe((1160).toLocaleString());
    expect(count[0]).not.toHaveClass(styles.strong);
    expect(count[0]).not.toHaveClass(styles.divider);

    const both = labels(getByTestId('both'));

    expect(both).toHaveLength(2);
    expect(both[0]).toHaveClass(styles.strong);
    expect(both[1]).toHaveClass(styles.divider);
    expect(both[1]).not.toHaveClass(styles.strong);
  });

  it('applies the label size classes to both the value and count text, only for large and extra-large', () => {
    const { getByTestId } = render(
      <>
        <RatingDisplay data-testid="small" size="small" value={4} count={5} />
        <RatingDisplay data-testid="medium" value={4} count={5} />
        <RatingDisplay data-testid="large" size="large" value={4} count={5} />
        <RatingDisplay data-testid="extra-large" size="extra-large" value={4} count={5} />
      </>,
    );

    ['small', 'medium'].forEach(id => {
      labels(getByTestId(id)).forEach(label => {
        expect(label).not.toHaveClass(styles.large);
        expect(label).not.toHaveClass(styles['extra-large']);
      });
    });

    labels(getByTestId('large')).forEach(label => expect(label).toHaveClass(styles.large));
    labels(getByTestId('extra-large')).forEach(label => expect(label).toHaveClass(styles['extra-large']));
  });

  it('overlays both indicators at a half value, and one at either extreme', () => {
    // Fill is `Math.round(value * 2) / 2` against each item's own value, so the boundaries sit
    // at the quarter points: 0.25 rounds up to a half fill, 0.75 up to a full one.
    const fills: Array<[string, number, 'empty' | 'half' | 'full']> = [
      ['zero', 0, 'empty'],
      ['low', 0.2, 'empty'],
      ['quarter', 0.25, 'half'],
      ['half', 0.5, 'half'],
      ['high', 0.7, 'half'],
      ['three-quarter', 0.75, 'full'],
      ['one', 1, 'full'],
    ];

    const { getByTestId } = render(
      <>
        {fills.map(([id, value]) => (
          <RatingDisplay key={id} data-testid={id} max={1} value={value} />
        ))}
      </>,
    );

    fills.forEach(([id, , fill]) => {
      const item = items(getByTestId(id))[0];
      const indicators = item.querySelectorAll<HTMLElement>(`.${itemStyles.indicator}`);

      expect(indicators).toHaveLength(fill === 'half' ? 2 : 1);

      if (fill === 'half') {
        // renderRatingItem paints the unselected glyph first; the selected one clips on top.
        expect(indicators[0]).toHaveClass(itemStyles['upper-half']);
        expect(indicators[1]).toHaveClass(itemStyles['lower-half']);
      } else {
        expect(indicators[0]).not.toHaveClass(itemStyles['upper-half']);
        expect(indicators[0]).not.toHaveClass(itemStyles['lower-half']);

        if (fill === 'full') {
          expect(indicators[0]).not.toHaveClass(itemStyles['unselected-neutral']);
        } else {
          expect(indicators[0]).toHaveClass(itemStyles['unselected-neutral']);
        }
      }
    });
  });

  it('forces a full fill on the single compact item', () => {
    const { getByTestId } = render(<RatingDisplay data-testid="root" compact value={0} />);

    const item = items(getByTestId('root'))[0];
    const indicators = item.querySelectorAll<HTMLElement>(`.${itemStyles.indicator}`);

    expect(indicators).toHaveLength(1);
    expect(indicators[0]).not.toHaveClass(itemStyles['unselected-neutral']);
    expect(item.getAttribute('aria-hidden')).toBe('true');
  });

  it('publishes its colour and size to the items it builds', () => {
    const { getByTestId } = render(<RatingDisplay data-testid="root" color="brand" size="large" value={5} />);

    const item = items(getByTestId('root'))[0];

    expect(item).toHaveClass(itemStyles.large);
    expect(item.querySelector(`.${itemStyles.indicator}`)).toHaveClass(itemStyles['selected-brand']);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      color: 'neutral',
      compact: false,
      components: { root: 'div', valueText: 'span', countText: 'span' },
      countText: { children: '10', className: 'count' },
      max: 5,
      root: { as: 'div', className: 'consumer' },
      size: 'large',
      valueText: { children: 4, className: 'value' },
    } as unknown as RatingDisplayState;

    const styled = useRatingDisplayStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.valueText!.className).toBe('value');
    expect(state.countText!.className).toBe('count');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(ratingDisplayClassNames.root);
    expect(styled.valueText!.className).toContain('value');
    expect(styled.countText!.className).toContain('count');
  });
});
