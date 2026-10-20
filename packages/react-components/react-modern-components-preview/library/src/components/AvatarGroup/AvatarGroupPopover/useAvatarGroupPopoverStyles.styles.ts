import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarGroupPopoverSlots, AvatarGroupPopoverState } from './AvatarGroupPopover.types';
import styles from './AvatarGroupPopover.module.css';

export const avatarGroupPopoverClassNames: SlotClassNames<AvatarGroupPopoverSlots> = {
  triggerButton: 'fui-AvatarGroupPopover__triggerButton',
  tooltip: 'fui-AvatarGroupPopover__tooltip',
  content: 'fui-AvatarGroupPopover__content',
  popoverSurface: 'fui-AvatarGroupPopover__popoverSurface',
};

/** Apply styling to the AvatarGroupPopover slots. */
export const useAvatarGroupPopoverStyles = (state: AvatarGroupPopoverState): AvatarGroupPopoverState => {
  state.triggerButton.className = clsx(
    avatarGroupPopoverClassNames.triggerButton,
    styles.triggerButton,
    state.triggerButton.className,
  );
  state.content.className = clsx(avatarGroupPopoverClassNames.content, styles.content, state.content.className);
  state.popoverSurface.className = clsx(
    avatarGroupPopoverClassNames.popoverSurface,
    styles.popoverSurface,
    state.popoverSurface.className,
  );
  return state;
};
