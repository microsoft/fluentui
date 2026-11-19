import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { LinkSlots, LinkState } from './Link.types';
import styles from './Link.module.css';

export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

export const useLinkStyles_unstable = (state: LinkState): LinkState => {
  state.root.className = clsx(
    linkClassNames.root,
    styles.root,
    state.root.as === 'a' && state.root.href && styles.href,
    state.root.as === 'button' && styles.button,
    styles[state.appearance],
    state.backgroundAppearance && styles[state.backgroundAppearance],
    state.inline && styles.inline,
    state.disabled && styles.disabled,
    state.root.className,
  );

  return state;
};
