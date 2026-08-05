import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant<ListItemProps>({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    displayName: 'ListItem',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format, which D16.1 removed from this package:
    // `listItemClassNames` is retained but re-pointed to the group marker and narrowed to
    // `{ root }`, and the `checkmark` key is gone. Its `has-static-classnames` testOptions
    // entry (which forced the checkmark slot to render so its static could be found) went with
    // it. The test is deleted from the default set repo-wide when the sweep completes (D16.6);
    // until then converted packages opt out here. `component-has-group-marker` (now a default test) replaces
    // it — it asserts the marker IS stamped and, crucially, that it is never `classList[0]`
    // (D16.2).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });

  // Regression guard for the D16.3 / M2 slot-composition edge (statics-removal-design.md
  // §2.2): ListItem writes its own class onto the `indicator` slot of the Checkbox it
  // constructs, and must MERGE with whatever the consumer passed rather than replace it.
  // `slot.always`'s `{ ...defaultProps, ...props }` would drop ours silently, which is why
  // useListItemStyles_unstable composes with clsx instead of handing the class to
  // `defaultProps`.
  it('keeps a consumer className on the checkmark indicator slot', () => {
    const result = render(
      // Passing the slot at all is what makes it render — `slot.optional` only skips an
      // `undefined` value when `renderByDefault` is false, and selection mode is off here.
      <ListItem checkmark={{ indicator: { className: 'consumer-indicator' } }}>ListItem</ListItem>,
    );

    const indicator = result.container.querySelector('.consumer-indicator');

    expect(indicator).not.toBeNull();
    // The library's own class is hashed by CSS Modules, so assert on its shape rather than
    // its value — and assert the consumer's stays LAST, the invariant every slot shares.
    expect(indicator!.className).toMatch(/\S+\s+consumer-indicator$/);
  });

  // PR-36513 review item 15: an explicit `null` indicator means SUPPRESS the slot —
  // Checkbox's `slot.optional` drops it. The styles hook used to flatten `null` to
  // `undefined` (`?? undefined`), which `slot.always` then normalised into a fresh default
  // `<div>`, recreating the element the consumer disabled. `null` must pass through.
  it('renders no indicator when the consumer suppresses it with an explicit null', () => {
    const suppressed = render(<ListItem checkmark={{ indicator: null }}>ListItem</ListItem>);
    // Sibling control: same render shape with the indicator left to its default, so the
    // absence below is attributable to the `null` and not to the checkmark never rendering.
    const defaulted = render(<ListItem checkmark={{}}>ListItem</ListItem>);

    const indicatorSelector = '[class*="checkmark-indicator"]';

    expect(defaulted.container.querySelector(indicatorSelector)).not.toBeNull();
    expect(suppressed.container.querySelector(indicatorSelector)).toBeNull();
  });
});
