import { clsx } from 'clsx';

import type { ButtonState } from './Button.types';

import styles from './Button.module.css';

/**
 * Public identity class for Button — the Tailwind named-group marker. It is the ONLY
 * public class; every other class name is a hashed CSS Modules ident. Style descendants
 * with `group-*\/fui-button` variants (or `[class~='group/fui-button']` in plain CSS)
 * rather than targeting internals.
 */
export const buttonClassNames: { root: string } = {
  root: 'group/fui-button',
};

type ButtonRootDataAttributes = {
  'data-size'?: ButtonState['size'];
  'data-empty'?: true;
};

/**
 * Applies the Fluent visual contract to the headless Button state.
 *
 * `data-disabled`, `data-disabled-focusable`, `data-icon-only` and `data-icon-position`
 * are already set by the headless `useButton`; the two below are windmod-only styling
 * states.
 */
export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { appearance, shape } = state;

  const root = state.root as ButtonState['root'] & ButtonRootDataAttributes;

  root['data-size'] = state.size;
  root['data-empty'] = !state.root.children || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi's :scope
  // polyfill throws on the `/`), consumer className LAST so consumer overrides win.
  state.root.className = clsx(
    styles.root,
    buttonClassNames.root,
    styles[appearance],
    styles[shape],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
