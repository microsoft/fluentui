import clsx from 'clsx';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import styles from './TeachingPopoverFooter.module.css';

export const teachingPopoverFooterClassNames = {
  root: 'fui-TeachingPopoverFooter',
  primary: 'fui-TeachingPopoverFooter__primary',
  secondary: 'fui-TeachingPopoverFooter__secondary',
} as const;

export const useTeachingPopoverFooterStyles = (state: TeachingPopoverFooterState): TeachingPopoverFooterState => {
  state.root.className = clsx(teachingPopoverFooterClassNames.root, styles.root, state.root.className);
  state.primary.className = clsx(teachingPopoverFooterClassNames.primary, styles.button, state.primary.className);
  if (state.secondary) {
    state.secondary.className = clsx(
      teachingPopoverFooterClassNames.secondary,
      styles.button,
      state.secondary.className,
    );
  }
  return state;
};
