import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { SplitButtonState } from './SplitButton.types';

import styles from './SplitButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const splitButtonClassNames: { root: string } = {
  root: componentMarkers('split-button'),
};

type SplitButtonRootDataAttributes = {
  'data-appearance'?: SplitButtonState['appearance'];
  'data-disabled'?: true;
  'data-disabled-focusable'?: true;
};

/**
 * Applies the visual contract, returning new state. The headless wrapper stamps nothing at all —
 * the two child buttons carry their own state attributes — so the divider colour, which Griffel
 * gates on the SplitButton's own appearance and disabled-ness, needs these three on the root.
 */
export const useSplitButtonStyles = (state: SplitButtonState): SplitButtonState => {
  const root: SplitButtonState['root'] & SplitButtonRootDataAttributes = {
    ...state.root,
    'data-appearance': state.appearance,
    'data-disabled': state.disabled || undefined,
    'data-disabled-focusable': state.disabledFocusable || undefined,
    className: clsx(splitButtonClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    primaryActionButton: slotClasses(state.primaryActionButton, styles.primaryActionButton),
    menuButton: slotClasses(state.menuButton, styles.menuButton),
  };
};
