import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Rating as HeadlessRating } from '@fluentui/react-headless-components-preview/rating';

import { isConformant } from '../../testing/isConformant';
import { RatingItem } from '../RatingItem';
import { useRatingItemContext } from '../RatingItem/RatingItemContext';
import { Rating } from './Rating';
import type { RatingState } from './Rating.types';
import { ratingClassNames, useRatingStyles } from './useRatingStyles';

import itemStyles from '../RatingItem/RatingItem.module.css';
import styles from './Rating.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/rating', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/rating');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useRating: (...args: Parameters<typeof actual.useRating>) => deepFreezeState(actual.useRating(...args)),
  };
});

// Two identifiable glyphs: in an interactive rating the selected and unselected indicators carry
// the same classes at the neutral colour, so only the glyph tells them apart.
const Filled = (): React.ReactNode => <i data-glyph="filled" />;
const Outline = (): React.ReactNode => <i data-glyph="outline" />;

const items = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>('.fui-rating-item'));
const inputs = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLInputElement>('input'));
const indicators = (item: HTMLElement) => item.querySelectorAll<HTMLElement>(`.${itemStyles.indicator}`);
const filledGlyphs = (item: HTMLElement) => item.querySelectorAll('[data-glyph="filled"]');

const renderRatingRoot = (ui: React.ReactElement): HTMLElement => {
  const { container } = render(ui);

  return container.firstElementChild as HTMLElement;
};

// Structural signature of a rendered rating: tags, classes and attributes, minus the per-instance
// generated `name` and minus `checked` — the selection is what a preview deliberately does NOT
// move, so it is the one attribute a hover and its equal-value render are expected to differ on.
const ignoredAttributes = new Set(['name', 'checked']);
const shape = (root: HTMLElement): string =>
  JSON.stringify(
    [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))].map(node => [
      node.tagName,
      ...Array.from(node.attributes)
        .filter(attribute => !ignoredAttributes.has(attribute.name))
        .map(attribute => `${attribute.name}=${attribute.value}`)
        .sort(),
    ]),
  );

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
  });

  it('stamps the marker class', () => {
    const root = renderRatingRoot(<Rating />);

    expect(root).toHaveClass('fui-rating');
    expect(root).toHaveClass('group/fui-rating');
    expect(root.classList[0]).toBe('fui-rating');
  });

  it('carries the module class and keeps a consumer className', () => {
    const root = renderRatingRoot(<Rating className="consumer" />);

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
  });

  it('renders one item per max', () => {
    expect(items(renderRatingRoot(<Rating />))).toHaveLength(5);
    expect(items(renderRatingRoot(<Rating max={3} />))).toHaveLength(3);
    expect(items(renderRatingRoot(<Rating max={1} />))).toHaveLength(1);
  });

  it('renders nothing at all through the bare headless surface', () => {
    // The headless hook sets no root children, so the headless component renders an empty
    // radiogroup for every prop shape; windmod's own children are the only ones there will be.
    const root = renderRatingRoot(<HeadlessRating max={5} value={3} step={0.5} />);

    expect(root.getAttribute('role')).toBe('radiogroup');
    expect(root.children).toHaveLength(0);
  });

  it('lets consumer children replace the generated items', () => {
    const root = renderRatingRoot(
      <Rating>
        <RatingItem value={1} />
        <RatingItem value={2} />
      </Rating>,
    );

    expect(items(root)).toHaveLength(2);
  });

  it('keeps the radiogroup role and shares one generated name across every input', () => {
    const root = renderRatingRoot(<Rating max={3} />);

    expect(root.getAttribute('role')).toBe('radiogroup');

    const names = new Set(inputs(root).map(input => input.name));

    expect(names.size).toBe(1);
    expect([...names][0]).toMatch(/^rating-/);
  });

  it('renders two inputs per item at a half step and one at a whole step', () => {
    const half = renderRatingRoot(<Rating max={3} step={0.5} />);

    expect(inputs(half)).toHaveLength(6);
    expect(inputs(half).map(input => input.value)).toEqual(['0.5', '1', '1.5', '2', '2.5', '3']);

    const whole = renderRatingRoot(<Rating max={3} step={1} />);

    expect(inputs(whole)).toHaveLength(3);
    expect(inputs(whole).map(input => input.value)).toEqual(['1', '2', '3']);
  });

  it('keeps a controlled value pinned while still reporting the change', () => {
    const onChange = jest.fn();
    const root = renderRatingRoot(<Rating max={5} value={2} onChange={onChange} />);

    expect(
      inputs(root)
        .filter(input => input.checked)
        .map(input => input.value),
    ).toEqual(['2']);

    fireEvent.click(inputs(root)[3]);

    expect(onChange).toHaveBeenCalledTimes(1);

    // The payload is asserted field by field: it carries the synthetic event, and `toEqual`
    // walking that event throws (`'get type' called on an object that is not a valid Event`).
    const [event, data] = onChange.mock.calls[0];

    expect(Object.keys(data).sort()).toEqual(['event', 'type', 'value']);
    expect(data.type).toBe('change');
    expect(data.event).toBe(event);
    expect(data.value).toBe(4);
    expect(
      inputs(root)
        .filter(input => input.checked)
        .map(input => input.value),
    ).toEqual(['2']);
  });

  it('moves an uncontrolled value on click', () => {
    const onChange = jest.fn();
    const root = renderRatingRoot(<Rating max={5} defaultValue={3} onChange={onChange} />);

    expect(
      inputs(root)
        .filter(input => input.checked)
        .map(input => input.value),
    ).toEqual(['3']);

    fireEvent.click(inputs(root)[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1].value).toBe(1);
    expect(
      inputs(root)
        .filter(input => input.checked)
        .map(input => input.value),
    ).toEqual(['1']);
  });

  it('previews the hovered value and restores the resting fill on leave', () => {
    const root = renderRatingRoot(<Rating max={5} value={0} iconFilled={Filled} iconOutline={Outline} />);

    expect(items(root).map(item => filledGlyphs(item).length)).toEqual([0, 0, 0, 0, 0]);

    fireEvent.mouseOver(inputs(root)[3]);

    expect(items(root).map(item => filledGlyphs(item).length)).toEqual([1, 1, 1, 1, 0]);

    fireEvent.mouseLeave(root);

    expect(items(root).map(item => filledGlyphs(item).length)).toEqual([0, 0, 0, 0, 0]);
  });

  it('renders the hovered value as the DOM that same value renders at rest', () => {
    // The preview is a value re-render, not a CSS state, so a static value sweep is a complete
    // oracle for it: hovering item N must produce the whole DOM of a rating whose value is N.
    for (const [step, hoverIndex, equivalentValue] of [
      [1, 3, 4],
      [0.5, 2, 1.5],
    ] as const) {
      const hovered = renderRatingRoot(<Rating max={5} name="pinned" step={step} value={0} />);
      const resting = shape(hovered);

      fireEvent.mouseOver(inputs(hovered)[hoverIndex]);

      const reference = renderRatingRoot(<Rating max={5} name="pinned" step={step} value={equivalentValue} />);

      expect(shape(hovered)).not.toBe(resting);
      expect(shape(hovered)).toBe(shape(reference));

      fireEvent.mouseLeave(hovered);

      expect(shape(hovered)).toBe(resting);
    }
  });

  it('defaults to the extra-large item size and the uncoloured neutral look', () => {
    const root = renderRatingRoot(<Rating max={2} value={2} />);

    for (const item of items(root)) {
      expect(item).toHaveClass(itemStyles['extra-large']);
      expect(item).not.toHaveClass(itemStyles.medium);
      expect(indicators(item)[0]).not.toHaveClass(itemStyles['selected-brand']);
      expect(indicators(item)[0]).not.toHaveClass(itemStyles['selected-marigold']);
    }
  });

  it('publishes one item-context object across re-renders', () => {
    const seen: unknown[] = [];
    const Probe = (): React.ReactNode => {
      seen.push(useRatingItemContext());

      return null;
    };
    const { rerender } = render(
      <Rating value={1}>
        <Probe />
      </Rating>,
    );

    rerender(
      <Rating value={2}>
        <Probe />
      </Rating>,
    );

    expect(seen.length).toBeGreaterThan(1);
    expect(new Set(seen).size).toBe(1);
  });

  it('fills every item and checks none when the value runs past max', () => {
    const root = renderRatingRoot(<Rating max={3} value={7} />);

    expect(items(root).map(item => indicators(item).length)).toEqual([1, 1, 1]);
    expect(inputs(root).filter(input => input.checked)).toHaveLength(0);
  });

  it('renders both indicators only on a half-filled item', () => {
    const half = renderRatingRoot(<Rating max={3} value={2.5} />);

    expect(items(half).map(item => indicators(item).length)).toEqual([1, 1, 2]);

    const rounded = renderRatingRoot(<Rating max={3} value={2.2} />);

    expect(items(rounded).map(item => indicators(item).length)).toEqual([1, 1, 1]);
  });

  it('passes itemLabel through to the inputs', () => {
    const root = renderRatingRoot(<Rating max={3} itemLabel={rating => `${rating} of 3`} />);

    expect(inputs(root).map(input => input.getAttribute('aria-label'))).toEqual(['1 of 3', '2 of 3', '3 of 3']);
  });

  it('publishes colour and size to the items below it', () => {
    const root = renderRatingRoot(<Rating color="brand" size="small" max={3} value={3} />);

    for (const item of items(root)) {
      expect(item).toHaveClass(itemStyles.small);
      expect(indicators(item)[0]).toHaveClass(itemStyles['selected-brand']);
    }
  });

  it('lets an explicit prop on a child item win over the published value', () => {
    const root = renderRatingRoot(
      <Rating color="brand" size="small">
        <RatingItem value={1} size="large" color="marigold" />
      </Rating>,
    );

    const item = items(root)[0];

    expect(item).toHaveClass(itemStyles.large);
    expect(item).not.toHaveClass(itemStyles.small);
    expect(indicators(item)[0]).toHaveClass(itemStyles['selected-marigold']);
  });

  it('stamps no data attribute', () => {
    const root = renderRatingRoot(<Rating color="brand" size="small" step={0.5} />);

    expect(root.hasAttribute('data-color')).toBe(false);
    expect(root.hasAttribute('data-size')).toBe(false);
    expect(root.hasAttribute('data-step')).toBe(false);
  });

  it('passes native props and the ref through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<Rating data-testid="root" id="rating" style={{ gap: '4px' }} ref={ref} />);

    const root = getByTestId('root');

    expect(root.id).toBe('rating');
    expect(root.style.gap).toBe('4px');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      color: 'neutral',
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
      size: 'extra-large',
    } as unknown as RatingState;

    const styled = useRatingStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(ratingClassNames.root);
  });

  it('routes iconFilled to the selected indicator and iconOutline to the unselected one', () => {
    const root = renderRatingRoot(<Rating max={3} value={2.5} iconFilled={Filled} iconOutline={Outline} />);

    const [first, , third] = items(root);

    expect(first.querySelectorAll('[data-glyph="filled"]')).toHaveLength(1);
    expect(first.querySelectorAll('[data-glyph="outline"]')).toHaveLength(0);
    expect(third.querySelectorAll('[data-glyph="filled"]')).toHaveLength(1);
    expect(third.querySelectorAll('[data-glyph="outline"]')).toHaveLength(1);
  });

  it('restores both star glyphs the headless surface strips', () => {
    // A filled item renders only the selected indicator and an empty one only the unselected, so
    // the two glyphs are readable in isolation; their path data must differ.
    const root = renderRatingRoot(<Rating max={2} value={1} />);
    const [filled, empty] = items(root).map(item =>
      indicators(item)[0].querySelector<SVGPathElement>('svg[data-fui-icon] path'),
    );

    expect(filled).not.toBeNull();
    expect(empty).not.toBeNull();
    expect(filled!.getAttribute('d')).not.toBe(empty!.getAttribute('d'));
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<Rating />)).not.toThrow();
    expect(() => render(<Rating step={0.5} value={2.5} />)).not.toThrow();
    expect(() => render(<Rating defaultValue={2} max={3} />)).not.toThrow();
  });
});
