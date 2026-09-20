import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagSlots, TagState } from './Tag.types';
import styles from './Tag.module.css';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  media: 'fui-Tag__media',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissIcon: 'fui-Tag__dismissIcon',
};

/**
 * Apply styling to the Tag slots based on the state.
 */
export const useTagStyles = (state: TagState): TagState => {
  state.root.className = clsx(tagClassNames.root, styles.root, state.root.className);

  if (state.media) {
    state.media.className = clsx(tagClassNames.media, styles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = clsx(tagClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = clsx(tagClassNames.primaryText, styles.primaryText, state.primaryText.className);
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      tagClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    state.dismissIcon.className = clsx(tagClassNames.dismissIcon, styles.dismissIcon, state.dismissIcon.className);
  }

  return state;
};
