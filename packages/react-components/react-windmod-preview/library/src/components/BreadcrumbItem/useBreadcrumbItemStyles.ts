import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { BreadcrumbItemState } from './BreadcrumbItem.types';

import styles from './BreadcrumbItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const breadcrumbItemClassNames: { root: string } = {
  root: componentMarkers('breadcrumb-item'),
};

/** Applies the visual contract, returning new state. The item's look is size-independent, so it stamps nothing. */
export const useBreadcrumbItemStyles = (state: BreadcrumbItemState): BreadcrumbItemState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(breadcrumbItemClassNames.root, styles.root, state.root.className),
  },
});
