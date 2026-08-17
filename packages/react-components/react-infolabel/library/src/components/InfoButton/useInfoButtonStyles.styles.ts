import { clsx } from 'clsx';
import type { InfoButtonState } from './InfoButton.types';

import styles from './InfoButton.module.css';

/**
 * Public identity class for InfoButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 * That also retires the `popover` key, which never named a rendered class at all — it only
 * existed to satisfy `SlotClassNames<InfoButtonSlots>`, a constraint the narrowed type drops.
 *
 * `'.' + infoButtonClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN
 * but terminates the name in selector position. Use `fuiSelector(infoButtonClassNames.root)`
 * from `@fluentui/react-utilities`.
 */
export const infoButtonClassNames: { root: string } = {
  root: 'group/fui-info-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type InfoButtonRootDataAttributes = {
  'data-size': InfoButtonState['size'];
  'data-open'?: true;
};

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { size } = state;
  const { open } = state.popover;

  const root = state.root as InfoButtonState['root'] & InfoButtonRootDataAttributes;

  // The four `react-hooks/immutability` disables this function used to carry are gone: once the
  // Griffel `usePopoverSurfaceStyles()` call was removed (see InfoButton.module.css §HISTORY) the
  // rule stopped reporting these assignments, and eslint flagged all four directives as unused.
  // Measured, not assumed — `nx run react-infolabel:lint` is clean with them deleted. The
  // MUTATIONS below are unchanged and still belong to the D14 sweep (worklist Item 2); this file
  // simply no longer needs a suppression for them.
  root['data-size'] = size;
  root['data-open'] = open || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.info.className = clsx(
    styles.info,
    size === 'large' ? styles['info-large'] : styles['info-small-medium'],
    state.info.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, infoButtonClassNames.root, state.root.className);

  return state;
};
