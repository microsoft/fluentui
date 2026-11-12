import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagSlots, TagState } from './Tag.types';
import sharedStyles from './TagSlots.module.css';
import styles from './Tag.module.css';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  media: 'fui-Tag__media',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissIcon: 'fui-Tag__dismissIcon',
};

export const useIconStyles = (): Record<'base' | 'medium' | 'small' | 'extra-small', string> => ({
  base: sharedStyles.icon,
  medium: sharedStyles['icon-medium'],
  small: sharedStyles['icon-small'],
  'extra-small': sharedStyles['icon-extra-small'],
});

export const useMediaStyles = (): Record<'base' | 'medium' | 'small' | 'extra-small', string> => ({
  base: sharedStyles.media,
  medium: sharedStyles['media-medium'],
  small: sharedStyles['media-small'],
  'extra-small': sharedStyles['media-extra-small'],
});

export const usePrimaryTextStyles = (): Record<
  'base' | 'medium' | 'small' | 'extra-small' | 'withoutSecondaryText' | 'withSecondaryText',
  string
> => ({
  base: sharedStyles.primaryText,
  medium: sharedStyles['primaryText-medium'],
  small: sharedStyles['primaryText-small'],
  'extra-small': sharedStyles['primaryText-extra-small'],
  withoutSecondaryText: sharedStyles['primaryText-withoutSecondaryText'],
  withSecondaryText: sharedStyles['primaryText-withSecondaryText'],
});

export const useSecondaryTextBaseClassName = (): string => sharedStyles.secondaryText;

export const useTagStyles_unstable = (state: TagState): TagState => {
  state.root.className = clsx(
    tagClassNames.root,
    styles.root,
    styles[state.shape],
    styles[state.size],
    styles[state.appearance],
    state.disabled && styles.disabled,
    state.selected && !state.disabled && styles.selected,
    !state.media && !state.icon && styles.withoutMedia,
    !state.dismissIcon && styles.withoutDismiss,
    sharedStyles[state.size],
    state.secondaryText ? sharedStyles.withSecondaryText : sharedStyles.withoutSecondaryText,
    state.root.className,
  );
  if (state.icon) {
    state.icon.className = clsx(tagClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  if (state.media) {
    state.media.className = clsx(tagClassNames.media, sharedStyles.media, state.media.className);
  }
  if (state.primaryText) {
    state.primaryText.className = clsx(
      tagClassNames.primaryText,
      sharedStyles.primaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      tagClassNames.secondaryText,
      sharedStyles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    state.dismissIcon.className = clsx(tagClassNames.dismissIcon, styles.dismissIcon, state.dismissIcon.className);
  }
  return state;
};
