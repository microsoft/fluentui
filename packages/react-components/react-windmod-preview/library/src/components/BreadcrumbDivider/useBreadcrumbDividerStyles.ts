import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { BreadcrumbDividerState } from './BreadcrumbDivider.types';

import styles from './BreadcrumbDivider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const breadcrumbDividerClassNames: { root: string } = {
  root: componentMarkers('breadcrumb-divider'),
};

type BreadcrumbDividerRootDataAttributes = {
  'data-size'?: BreadcrumbDividerState['size'];
};

/**
 * Applies the visual contract, returning new state. The size default is reachable only under a
 * headless Breadcrumb, which publishes no size to its children.
 *
 * The divider authors no colour: it inherits the provider's, which is what makes its chevron
 * match Griffel's.
 */
export const useBreadcrumbDividerStyles = (state: BreadcrumbDividerState): BreadcrumbDividerState => {
  const { size = 'medium' } = state;

  const root: BreadcrumbDividerState['root'] & BreadcrumbDividerRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(breadcrumbDividerClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};
