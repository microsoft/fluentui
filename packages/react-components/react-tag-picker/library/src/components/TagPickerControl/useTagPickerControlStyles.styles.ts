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
 * The value is a class TOKEN, not a selector — `'.' + tagPickerControlClassNames.root` is
 * invalid CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerControlClassNames.root)` from `@fluentui/react-utilities`.
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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All three live on the ROOT even though several of the rules they drive target the `aside`
 * and `expandIcon` slots: that is the headless preview's convention (reports/headless-precedent.md),
 * and it is what lets TagPickerControl.module.css reach those slots with `& .aside` / `& .icon`
 * descendant selectors instead of duplicating the attributes onto every slot.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` and `data-invalid` mirror the picker context's `disabled` and the field
 * context's `validationState === 'error'`. The root is a plain `<div>`: it carries neither a
 * `disabled` attribute nor `aria-invalid` (only the `expandIcon` gets `aria-disabled`), so
 * nothing native reaches these states. That is precisely the case DECISIONS.md D15.6 reserves
 * mirroring for.
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

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-TagPickerControl*`
  // BEM statics that used to lead this list are gone (D16.1); the marker is TagPickerControl's
  // sole public identity class now, and the only handle by which another module can style an
  // element from this control's state, because `styles.root` is hashed and unaddressable from
  // outside this file.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by block order inside
  // TagPickerControl.module.css, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces, including the
  // three inversions it inherits from the shared Combobox/Input/Select field shell.
  //
  // The `!disabled &&` guard on `outlineInteractive` is now an `@variant enabled` block inside
  // `.outline`; `appearance === 'outline' | 'underline'` is the appearance class itself; and
  // `invalid && appearance !== 'underline'` is `@variant invalid` on the three non-underline
  // appearance classes. `styles[size]` is the root's `data-size`.

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
