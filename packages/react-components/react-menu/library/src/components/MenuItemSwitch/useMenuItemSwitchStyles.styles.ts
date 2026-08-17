'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useMenuItemStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useMenuListStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';

import styles from './MenuItemSwitch.module.css';

/**
 * Public identity class for MenuItemSwitch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1). The per-slot `icon` / `content` /
 * `secondaryContent` / `switchIndicator` / `subText` keys were removed with the BEM statics
 * (DECISIONS.md D16.1 / D16.5); there is no public class-name handle on component internals.
 *
 * `'.' + menuItemSwitchClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuItemSwitchClassNames: { root: string } = {
  root: 'group/fui-menu-item-switch',
};

/**
 * Class applied to the switch thumb that `useMenuItemSwitch_unstable` renders by default
 * (`<CircleFilled />`).
 *
 * RE-POINTED by the statics removal (DECISIONS.md D16.1 / D16.3): this used to be the string
 * `'fui-MenuItemSwitch__switchIndicator__circleFilled'`, a `fui-`-prefixed class that was NOT
 * a public identity — exactly the shape D16.1 abolishes. The element is created by this
 * package, so the coupling is removed rather than renamed: the class is now the hashed
 * CSS-Modules local that `MenuItemSwitch.module.css` scopes its thumb rules under
 * (mechanism M2, D16.3). The export name and its role are unchanged; only the value is.
 */
export const circleFilledClassName: string = styles['circle-filled'];

/**
 * Apply styling to the MenuItemSwitch slots based on the state
 */
export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
  const { checked, subText } = state;
  const multiline = !!subText;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, root: { ...state.root, className: clsx(menuItemSwitchClassNames.root, state.root.className) } };

  // The Griffel source put `multiline && multilineStyles.switch` AFTER the consumer
  // className; class-attribute position carries no cascade meaning, so the conditional
  // class moves ahead of the consumer's — `classname-overrides-win` (DECISIONS.md D9).
  if (state.switchIndicator) {
    state = {
      ...state,
      switchIndicator: {
        ...state.switchIndicator,
        className: clsx(
          styles['switch-indicator'],
          checked && styles['switch-indicator-checked'],
          multiline && styles['switch-indicator-multiline'],
          state.switchIndicator.className,
        ),
      },
    };
  }

  // Called LAST, exactly as before. The spread is a SHALLOW copy, so `state.root` and every
  // other slot object handed over is still the one this component renders; only the
  // checkmark/submenuIndicator/submenu flags are neutralised for the MenuItem styling pass.
  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal). The
  // object handed to MenuItem is a NEUTRALISED VIEW of this state, and MenuItemSwitchState omits
  // every key that view overrode, so those keys are destructured OFF the return before the
  // merge — threading them would publish MenuItem's view (`checkmark: undefined`,
  // `hasSubmenu: false`, `'span'` components) onto the object MenuItemSwitch actually renders.
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: menuItemComponents,
    checkmark: menuItemCheckmark,
    submenuIndicator: menuItemSubmenuIndicator,
    hasSubmenu: menuItemHasSubmenu,
    submenuOpen: menuItemSubmenuOpen,
    persistOnClick: menuItemPersistOnClick,
    ...composedMenuItem
  } = useMenuItemStyles_unstable({
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      checkmark: 'span',
      submenuIndicator: 'span',
    },
    checkmark: undefined,
    submenuIndicator: undefined,
    hasSubmenu: false,
    submenuOpen: false,
    persistOnClick: true,
  });

  state = { ...state, ...composedMenuItem };

  return state;
};
