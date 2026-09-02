'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { BreadcrumbButtonState } from './BreadcrumbButton.types';

import styles from './BreadcrumbButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const breadcrumbButtonClassNames: { root: string } = {
  root: componentMarkers('breadcrumb-button'),
};

type BreadcrumbButtonRootDataAttributes = {
  'data-disabled'?: true;
  'data-disabled-focusable'?: true;
  'data-icon-only'?: true;
  'data-icon-position'?: BreadcrumbButtonState['iconPosition'];
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless breadcrumb
 * button routes through Griffel's base hook rather than the headless one, so none of the four
 * Button stamps below reach the root on their own.
 *
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useBreadcrumbButtonStyles = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const styled = useButtonStyles(state);

  return restackOver(state, styled, {
    marker: breadcrumbButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: {
      'data-disabled': state.disabled || undefined,
      'data-disabled-focusable': state.disabledFocusable || undefined,
      'data-icon-only': state.iconOnly || undefined,
      'data-icon-position': state.icon ? state.iconPosition : undefined,
    } satisfies BreadcrumbButtonRootDataAttributes,
  });
};
