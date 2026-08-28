import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceState } from './PopoverSurface.types';

import styles from './PopoverSurface.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const popoverSurfaceClassNames: { root: string } = {
  root: componentMarkers('popover-surface'),
};

type PopoverSurfaceRootDataAttributes = {
  'data-size'?: PopoverSurfaceState['size'];
};

// One key per PopoverSize member, so the keys partition the union with no implied else; `+()`
// coerces a condition to 1 or 0 because TS rejects a bare boolean computed key (TS2464).
const paddingClass = (size: PopoverSize): string =>
  ({
    [+(size === 'small')]: styles.small,
    [+(size === 'medium')]: styles.medium,
    [+(size === 'large')]: styles.large,
  })[1];

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open,
 * data-popover-surface and the live data-placement; only data-size is missing, and both the
 * padding blocks and the arrow's height constants read it. The unset appearance is the neutral
 * surface and carries no class.
 */
export const usePopoverSurfaceStyles = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const root: PopoverSurfaceState['root'] & PopoverSurfaceRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(
      popoverSurfaceClassNames.root,
      styles.root,
      paddingClass(state.size),
      state.appearance === 'inverted' && styles.inverted,
      state.appearance === 'brand' && styles.brand,
      state.root.className,
    ),
  };

  return { ...state, root };
};
