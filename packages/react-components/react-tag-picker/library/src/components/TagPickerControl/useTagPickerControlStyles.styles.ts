import { clsx } from 'clsx';
import type { TagPickerControlState } from './TagPickerControl.types';

import styles from './TagPickerControl.module.css';

/**
 * Public identity class for TagPickerControl.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `expandIcon`, `secondaryAction` and `aside` keys were removed
 * together with the `fui-TagPickerControl__*` BEM statics (DECISIONS.md D16.1/D16.5): there is
 * no public class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerControlClassNames: { root: string } = {
  root: 'group/fui-tag-picker-control',
};

/**
 * Name of the CSS custom property the ResizeObserver in `useTagPickerControl.tsx` writes with
 * the measured width of the `aside` slot, and which `TagPickerControl.module.css` reads in the
 * root's `padding-inline-end`.
 *
 * This is PUBLIC API and its spelling is load-bearing: `TagPickerControlCSSProperties`
 * (TagPickerControl.types.ts) declares the same literal, so a consumer may set it through the
 * root slot's `style` prop. The conversion changed nothing about it — neither the name, nor the
 * `, 0px` fallback in the module, nor the `element.style.setProperty` write.
 */
export const tagPickerControlAsideWidthToken = '--fui-TagPickerControl-aside-width' as const;

/**
 * Icon glyph sizes per TagPicker size.
 *
 * Retained as a public export (CONVERSION_GUIDE §3, "delete no exports"). The values now also
 * live in `TagPickerControl.module.css` as `calc(<px> * var(--base-scale))`, because a CSS
 * module cannot import a TS constant; the two are kept in sync by hand, exactly as the
 * `iconSizes` map and `useIconStyles` were before the conversion.
 */
export const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type TagPickerControlRootDataAttributes = {
  'data-size': TagPickerControlState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the PickerControl slots based on the state
 */
export const useTagPickerControlStyles_unstable = (state: TagPickerControlState): TagPickerControlState => {
  const { appearance, disabled, invalid, size } = state;

  const root = state.root as TagPickerControlState['root'] & TagPickerControlRootDataAttributes;

  root['data-size'] = size;

  root['data-disabled'] = disabled || undefined;

  root['data-invalid'] = invalid || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state.root.className = clsx(styles.root, tagPickerControlClassNames.root, styles[appearance], state.root.className);

  if (state.aside) {
    state.aside.className = clsx(styles.aside, state.aside.className);
  }

  if (state.expandIcon) {
    state.expandIcon.className = clsx(styles.icon, state.expandIcon.className);
  }

  if (state.secondaryAction) {
    state.secondaryAction.className = clsx(styles['secondary-action'], state.secondaryAction.className);
  }

  return state;
};
