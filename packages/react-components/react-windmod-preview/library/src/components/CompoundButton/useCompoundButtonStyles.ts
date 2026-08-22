'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { CompoundButtonState } from './CompoundButton.types';

import styles from './CompoundButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const compoundButtonClassNames: { root: string } = {
  root: componentMarkers('compound-button'),
};

type CompoundButtonRootDataAttributes = {
  'data-icon-position'?: CompoundButtonState['iconPosition'];
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless hook stamps
 * data-disabled/-disabled-focusable/-icon-only/-has-secondary-content and useButtonStyles stamps
 * data-appearance/-size/-empty; data-icon-position is the one attribute the headless compound
 * hook omits that Button's and this component's icon spacing both select on.
 *
 * Button's icon rules select through `group/fui-button`, so the root must keep Button's marker
 * pair alongside its own.
 */
export const useCompoundButtonStyles = (state: CompoundButtonState): CompoundButtonState => {
  const { root: buttonRoot, icon: buttonIcon } = useButtonStyles(state);

  const root: CompoundButtonState['root'] & CompoundButtonRootDataAttributes = {
    ...buttonRoot,
    'data-icon-position': state.icon ? state.iconPosition : undefined,
    className: clsx(compoundButtonClassNames.root, styles.root, buttonRoot.className),
  };

  return {
    ...state,
    root,
    icon: buttonIcon && { ...buttonIcon, className: clsx(styles.icon, buttonIcon.className) },
    contentContainer: {
      ...state.contentContainer,
      className: clsx(styles.contentContainer, state.contentContainer.className),
    },
    secondaryContent: state.secondaryContent && {
      ...state.secondaryContent,
      className: clsx(styles.secondaryContent, state.secondaryContent.className),
    },
  };
};
