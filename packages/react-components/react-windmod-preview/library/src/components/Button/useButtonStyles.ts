import { clsx } from 'clsx';

import type { ButtonState } from './Button.types';

import styles from './Button.module.css';

/** The only public class — the Tailwind named-group marker; internals are hashed idents. */
export const buttonClassNames: { root: string } = {
  root: 'group/fui-button',
};

type ButtonRootDataAttributes = {
  'data-size'?: ButtonState['size'];
  'data-empty'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled/-disabled-focusable/-icon-only/-icon-position; these two are style-only. */
export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { appearance, shape, size } = state;

  const root: ButtonState['root'] & ButtonRootDataAttributes = {
    ...state.root,
    'data-size': size,
    'data-empty': !state.root.children || undefined,
    // The marker's '/' must never be classList[0]: jsdom's nwsapi builds its :scope
    // polyfill from the first class unescaped, so element.matches() would throw.
    className: clsx(styles.root, buttonClassNames.root, styles[appearance], styles[shape], state.root.className),
  };

  return {
    ...state,
    root,
    icon: state.icon && { ...state.icon, className: clsx(styles.icon, state.icon.className) },
  };
};
