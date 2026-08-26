import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ButtonState } from './Button.types';

import styles from './Button.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const buttonClassNames: { root: string } = {
  root: componentMarkers('button'),
};

type ButtonRootDataAttributes = {
  'data-appearance'?: ButtonState['appearance'];
  'data-size'?: ButtonState['size'];
  'data-empty'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled/-disabled-focusable/-icon-only/-icon-position; these three are style-only.
 * The icon rules select through `group/fui-button`, so a hook composing this one must keep
 * Button's marker pair on its root alongside its own. */
export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { appearance, shape, size } = state;

  const root: ButtonState['root'] & ButtonRootDataAttributes = {
    ...state.root,
    'data-appearance': appearance,
    'data-size': size,
    'data-empty': !state.root.children || undefined,
    className: clsx(buttonClassNames.root, styles.root, styles[appearance], styles[shape], state.root.className),
  };

  return {
    ...state,
    root,
    icon: state.icon && { ...state.icon, className: clsx(styles.icon, state.icon.className) },
  };
};
