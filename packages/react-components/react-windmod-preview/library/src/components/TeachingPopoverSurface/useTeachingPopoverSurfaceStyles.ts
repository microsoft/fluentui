'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { usePopoverSurfaceStyles } from '../PopoverSurface/usePopoverSurfaceStyles';
import type { TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

import styles from './TeachingPopoverSurface.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const teachingPopoverSurfaceClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-surface'),
};

/**
 * Applies the visual contract, returning new state. Both marker pairs stay on the root:
 * PopoverSurface's is load-bearing, because every arrow placement rule keys on
 * `group-placement-*\/fui-popover-surface`.
 */
export const useTeachingPopoverSurfaceStyles = (state: TeachingPopoverSurfaceState): TeachingPopoverSurfaceState => {
  const surfaceState = usePopoverSurfaceStyles(state);

  return {
    ...surfaceState,
    root: {
      ...surfaceState.root,
      className: clsx(teachingPopoverSurfaceClassNames.root, styles.root, surfaceState.root.className),
    },
  };
};
