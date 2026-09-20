import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { LinkSlots, LinkState } from './Link.types';
import styles from './Link.module.css';

export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

/**
 * Apply styling to the Link root.
 */
export const useLinkStyles = (state: LinkState): LinkState => {
  state.root.className = clsx(linkClassNames.root, styles.root, state.root.className);

  return state;
};
