import { clsx } from 'clsx';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceState } from './PopoverSurface.types';

import styles from './PopoverSurface.module.css';

/**
 * PopoverSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const popoverSurfaceClassNames: { root: string } = {
  root: 'group/fui-popover-surface',
};

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type PopoverSurfaceRootDataAttributes = {
  'data-size': PopoverSurfaceState['size'];
  'data-inline'?: true;
};

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const root = state.root as PopoverSurfaceState['root'] & PopoverSurfaceRootDataAttributes;

  root['data-size'] = state.size;
  root['data-inline'] = state.inline || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    popoverSurfaceClassNames.root,
    state.appearance === 'inverted' && styles.inverted,
    state.appearance === 'brand' && styles.brand,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.arrowClassName = clsx(
    styles.arrow,
    state.size === 'small' ? styles['arrow-small'] : styles['arrow-medium-large'],
  );

  return state;
};
