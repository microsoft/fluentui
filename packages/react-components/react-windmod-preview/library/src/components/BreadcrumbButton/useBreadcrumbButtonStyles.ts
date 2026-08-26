'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
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
 * The root keeps Button's marker pair alongside its own — see `useButtonStyles`.
 */
export const useBreadcrumbButtonStyles = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const { root: buttonRoot, icon: buttonIcon } = useButtonStyles(state);

  const root: BreadcrumbButtonState['root'] & BreadcrumbButtonRootDataAttributes = {
    ...buttonRoot,
    'data-disabled': state.disabled || undefined,
    'data-disabled-focusable': state.disabledFocusable || undefined,
    'data-icon-only': state.iconOnly || undefined,
    'data-icon-position': state.icon ? state.iconPosition : undefined,
    className: clsx(breadcrumbButtonClassNames.root, styles.root, buttonRoot.className),
  };

  return {
    ...state,
    root,
    icon: buttonIcon && { ...buttonIcon, className: clsx(styles.icon, buttonIcon.className) },
  };
};
