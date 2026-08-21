import { clsx } from 'clsx';

import type { ButtonState } from './Button.types';

import styles from './Button.module.css';

/**
 * Public identity class for Button — the Tailwind named-group marker, and the ONLY public
 * class (everything else is a hashed CSS Modules ident). Target it with `group-*\/fui-button`
 * variants rather than internals.
 */
export const buttonClassNames: { root: string } = {
  root: 'group/fui-button',
};

type ButtonRootDataAttributes = {
  'data-size'?: ButtonState['size'];
  'data-empty'?: true;
};

/**
 * Applies the Fluent visual contract, returning new state (no slot mutation). The headless
 * hook already stamps data-disabled/-disabled-focusable/-icon-only/-icon-position;
 * data-size and data-empty are windmod-only styling states.
 */
export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { appearance, shape, size } = state;

  const root: ButtonState['root'] & ButtonRootDataAttributes = {
    ...state.root,
    'data-size': size,
    'data-empty': !state.root.children || undefined,
    // Module class FIRST (a group marker as classList[0] breaks nwsapi's :scope polyfill),
    // consumer className LAST so consumer overrides win.
    className: clsx(styles.root, buttonClassNames.root, styles[appearance], styles[shape], state.root.className),
  };

  return {
    ...state,
    root,
    icon: state.icon && { ...state.icon, className: clsx(styles.icon, state.icon.className) },
  };
};
