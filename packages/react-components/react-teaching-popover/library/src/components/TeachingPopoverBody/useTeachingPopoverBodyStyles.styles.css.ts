import { clsx } from 'clsx';
import type { TeachingPopoverBodySlots, TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverBody.module.css';

export const teachingPopoverBodyClassNames: SlotClassNames<TeachingPopoverBodySlots> = {
  root: 'fui-TeachingPopoverBody',
  media: 'fui-TeachingPopoverBody__media',
};

/** Compatibility export: returns the media class names of the Griffel implementation. */
export const useMediaStyles = (): Record<'base' | 'short' | 'medium' | 'tall', string> => ({
  base: styles.media,
  short: styles.short,
  medium: styles.medium,
  tall: styles.tall,
});

/** Applies style classnames to slots */
export const useTeachingPopoverBodyStyles_unstable = (state: TeachingPopoverBodyState): TeachingPopoverBodyState => {
  const { mediaLength } = state;

  state.root.className = clsx(teachingPopoverBodyClassNames.root, styles.root, state.root.className);

  if (state.media) {
    state.media.className = clsx(
      teachingPopoverBodyClassNames.media,
      styles.media,
      styles[mediaLength],
      state.media.className,
    );
  }

  return state;
};
