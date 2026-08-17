import { clsx } from 'clsx';
import type { ButtonState } from './Button.types';

import styles from './Button.module.css';

/**
 * Public identity classes for Button.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The per-slot `icon` key was removed in D16.5; there is no public
 * class-name handle on component internals.
 *
 * `'.' + buttonClassNames.root` is an invalid *selector* — the `/` terminates the class name.
 * Use `fuiSelector(buttonClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const buttonClassNames: { root: string } = {
  root: 'group/fui-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Names follow the
 * headless preview's vocabulary (`data-disabled`, `data-disabled-focusable`,
 * `data-icon-only` are the three that `react-headless-components-preview`'s own
 * `useButton` already stamps — reports/headless-precedent.md).
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-icon-only="false"` and still match
 * `[data-icon-only]`. (The headless preview writes `''` instead of `true` via
 * `stringifyDataAttribute`; both forms match a presence selector — this file follows the
 * `|| undefined` form the react-divider pilot established.)
 *
 * `data-icon-position` is written ONLY when the icon slot exists, so its *presence*
 * doubles as the "has an icon" signal that `rootStyles.smallWithIcon` / `.largeWithIcon`
 * branch on (`icon && size === 'small'`). That is why the icon slot itself carries no
 * data attributes: both its placement and its scale are selected from the root.
 *
 * `data-empty` mirrors `!state.root.children`, the guard on the icon's margin
 * (`!!state.root.children && iconStyles[iconPosition]`). Same attribute the react-divider
 * pilot introduced.
 */
type ButtonRootDataAttributes = {
  'data-size': ButtonState['size'];
  'data-icon-position'?: ButtonState['iconPosition'];
  'data-icon-only'?: true;
  'data-disabled'?: true;
  'data-disabled-focusable'?: true;
  'data-empty'?: true;
};

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  const root = state.root as ButtonState['root'] & ButtonRootDataAttributes;

  root['data-size'] = size;
  root['data-icon-position'] = icon ? iconPosition : undefined;
  root['data-icon-only'] = iconOnly || undefined;
  root['data-disabled'] = disabled || undefined;
  root['data-disabled-focusable'] = disabledFocusable || undefined;
  root['data-empty'] = !state.root.children || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    buttonClassNames.root,
    appearance && styles[appearance],
    styles[shape],
    state.root.className,
  );

  if (state.icon) {
    // `styles.icon` is this module's own local, and after D16 it is the ONLY class this hook
    // writes here: the icon slot has no public handle, and every rule that used to select
    // `:global(.fui-Button__icon)` now selects `.icon` from inside Button.module.css.
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
