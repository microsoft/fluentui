import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';

describe('RatingDisplay', () => {
  isConformant({
    Component: RatingDisplay,
    displayName: 'RatingDisplay',
    requiredProps: { count: 1160, value: 4.5 },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1/D16.6). RatingDisplay no longer renders
      // `fui-RatingDisplay` / `fui-RatingDisplay__<slot>`, and `ratingDisplayClassNames` is
      // now `{ root: 'group/fui-rating-display' }`, so all three assertions in
      // `component-has-static-classnames-object` — the export shape, the
      // `fui-<Component>__<slot>` format and the rendered classes — no longer describe this
      // component. `component-has-group-marker` (now a default test) is its replacement: the group marker
      // is the sole public identity class now (D16.5).
      'component-has-static-classnames-object',
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });
  it('renders the correct number of items', () => {
    const { getByRole } = render(<RatingDisplay max={10} />);
    expect(getByRole('img').children.length).toEqual(10);
  });
  // Statics removal (DECISIONS.md D16.1): `fui-RatingDisplay__valueText` /
  // `fui-RatingDisplay__countText` are gone, and D16 leaves no public class-name handle on
  // component internals. The slots are identified instead by the `rating-value-` /
  // `rating-count-` id prefixes `useRatingDisplayBase_unstable` mints with `useId` — the
  // same ids the root's `aria-labelledby` is composed from, so they are load-bearing rather
  // than incidental.
  const VALUE_TEXT_SELECTOR = '[id^="rating-value-"]';
  const COUNT_TEXT_SELECTOR = '[id^="rating-count-"]';

  it('renders the valueText slot when a value is provided', () => {
    const { getByText } = render(<RatingDisplay value={3} />);
    const valueText = getByText('3');
    expect(valueText).toBeDefined();
    expect(valueText.matches(VALUE_TEXT_SELECTOR)).toBeTruthy();
  });
  it('does not render the valueText slot when a value is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector(VALUE_TEXT_SELECTOR)).toBeNull();
  });
  it('renders the countText slot when a count is provided', () => {
    const { getByText } = render(<RatingDisplay count={1160} />);
    const countText = getByText('1,160');
    expect(countText).toBeDefined();
    expect(countText.matches(COUNT_TEXT_SELECTOR)).toBeTruthy();
  });
  it('does not render the countText slot when a count is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector(COUNT_TEXT_SELECTOR)).toBeNull();
  });
  it('renders only one item when compact is true', () => {
    const { getByRole } = render(<RatingDisplay compact />);
    const items = getByRole('img');
    // `getElementsByClassName` takes class TOKENS, not a selector, so the `/` in the group
    // marker needs no escaping here (DECISIONS.md D16.5 — `fuiSelector()` is for selectors).
    expect(items.getElementsByClassName('group/fui-rating-item').length).toEqual(1);
  });
});
