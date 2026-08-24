import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { BreadcrumbState } from './Breadcrumb.types';

import styles from './Breadcrumb.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const breadcrumbClassNames: { root: string } = {
  root: componentMarkers('breadcrumb'),
};

type BreadcrumbRootDataAttributes = {
  'data-size'?: BreadcrumbState['size'];
};

/**
 * Applies the visual contract, returning new state. No rule of this family selects the root's
 * own data-size; it is stamped only so a consumer can compose group variants against it.
 *
 * The root authors no typography or colour: the descendants that paint set their own, and the
 * provider supplies the inherited base.
 */
export const useBreadcrumbStyles = (state: BreadcrumbState): BreadcrumbState => {
  const root: BreadcrumbState['root'] & BreadcrumbRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(breadcrumbClassNames.root, state.root.className),
  };

  return {
    ...state,
    root,
    list: state.list && { ...state.list, className: clsx(styles.list, state.list.className) },
  };
};
