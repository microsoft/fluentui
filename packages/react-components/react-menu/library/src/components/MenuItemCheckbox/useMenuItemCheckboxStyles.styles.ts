'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useMenuItemStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useMenuListStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

/**
 * Public identity class for MenuItemCheckbox.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1). The per-slot `icon` / `checkmark` /
 * `content` / `secondaryContent` / `subText` keys were removed with the BEM statics
 * (DECISIONS.md D16.1 / D16.5); every one of them only ever carried a static, so the hook no
 * longer touches those slots at all — MenuItem's hook styles them.
 *
 * `'.' + menuItemCheckboxClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuItemCheckboxClassNames: { root: string } = {
  root: 'group/fui-menu-item-checkbox',
};

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  // Named group marker, consumer className last. There is no unconditional module class to
  // lead with — this component has no styles of its own; its root IS a MenuItem root — and
  // it does not need one: `useMenuItemStyles_unstable` runs LAST and PREPENDS its own
  // unconditional hashed `styles.root`, so the token that actually reaches `classList[0]`
  // is that hashed class and the D15.1 invariant holds on the rendered string. Before
  // D16.1 the `fui-MenuItemCheckbox` static held that position instead.
  //
  // The element legitimately carries TWO markers — `group/fui-menu-item-checkbox` and
  // MenuItem's `group/fui-menu-item` — because it genuinely is both, and a descendant (or
  // MenuSplitGroup's child selectors) can address whichever identity it means. Both are
  // declared to react-conformance's `component-has-group-marker` through
  // `testOptions['has-group-marker'].markers` in MenuItemCheckbox.test.tsx (D16.3).
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-menu-item-checkbox', state.root.className);

  // Called LAST, exactly as before: it composes its own classes ahead of the incoming
  // className, which keeps the consumer's string last in the rendered class attribute.
  // It also applies the checkmark styles (`useCheckmarkStyles_unstable`), which is why this
  // hook no longer calls that helper a second time — clsx does not dedupe the way
  // mergeClasses did, and the second call only ever produced duplicate class tokens.
  useMenuItemStyles_unstable(state);

  return state;
};
