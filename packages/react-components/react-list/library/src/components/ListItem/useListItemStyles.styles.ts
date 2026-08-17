import { clsx } from 'clsx';
import { slot } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { ListItemState } from './ListItem.types';

import styles from './ListItem.module.css';

/**
 * Props of the `indicator` sub-slot of the `<Checkbox>` this component renders as its
 * `checkmark` slot, with the shorthand and nullish members of `Slot<'div', 'span'>` excluded.
 *
 * Spelled out rather than inferred because `slot.always` needs a concrete `Props` to widen
 * its `SlotOptions`/return type against; left to inference it collapses to
 * `UnknownSlotProps`, whose optional `as` is no longer assignable back to the slot prop.
 * Mirrors `CheckboxSlots['indicator']` — the FIXME there notes the default should have been
 * `span`; if that ever changes this alias changes with it and nothing else here does.
 */
type CheckmarkIndicatorProps = ExtractSlotProps<Slot<'div', 'span'>>;

/**
 * Public identity classes for ListItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The BEM statics (`fui-ListItem`,
 * `fui-ListItem__checkmark`) were removed in D16.1, and with them the `checkmark` key: there
 * is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + listItemClassNames.root` is a `SyntaxError`. Use
 * `fuiSelector(listItemClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (D16.5).
 */
export const listItemClassNames: { root: string } = {
  root: 'group/fui-list-item',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type ListItemRootDataAttributes = {
  'data-interactive'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  const root = state.root as ListItemState['root'] & ListItemRootDataAttributes;

  root['data-interactive'] = state.selectable || state.navigable || undefined;
  root['data-disabled'] = state.disabled || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, listItemClassNames.root, state.root.className);

  if (state.checkmark) {
    state.checkmark.className = clsx(styles.checkmark, state.checkmark.className);

    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    if (state.checkmark.indicator !== null) {
      const indicator = slot.always<CheckmarkIndicatorProps>(state.checkmark.indicator, {
        elementType: 'div',
      });
      indicator.className = clsx(styles['checkmark-indicator'], indicator.className);
      state.checkmark.indicator = indicator;
    }
  }

  return state;
};
