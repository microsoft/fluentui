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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
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
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
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
});
