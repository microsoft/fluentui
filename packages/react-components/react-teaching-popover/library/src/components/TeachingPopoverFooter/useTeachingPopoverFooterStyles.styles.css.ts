import { clsx } from 'clsx';
import type { TeachingPopoverFooterSlots, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverFooter.module.css';

export const teachingPopoverFooterClassNames: SlotClassNames<TeachingPopoverFooterSlots> = {
  root: 'fui-TeachingPopoverFooter',
  primary: 'fui-TeachingPopoverFooter__primary',
  secondary: 'fui-TeachingPopoverFooter__secondary',
};

/** Applies style classnames to slots */
export const useTeachingPopoverFooterStyles_unstable = (
  state: TeachingPopoverFooterState,
): TeachingPopoverFooterState => {
  const { appearance, footerLayout } = state;
  const horizontal = footerLayout === 'horizontal';
  const buttonLayout = horizontal ? styles.buttonHorizontal : styles.buttonVertical;

  state.root.className = clsx(
    teachingPopoverFooterClassNames.root,
    styles.root,
    horizontal ? styles.horizontal : styles.vertical,
    state.root.className,
  );
  if (state.secondary) {
    state.secondary.className = clsx(
      teachingPopoverFooterClassNames.secondary,
      buttonLayout,
      appearance === 'brand' && styles.brandSecondary,
      state.secondary.className,
    );
  }
  state.primary.className = clsx(
    teachingPopoverFooterClassNames.primary,
    buttonLayout,
    appearance === 'brand' && styles.brandPrimary,
    state.primary.className,
  );

  return state;
};
