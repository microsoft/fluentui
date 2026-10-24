'use client';

import { mergeClasses } from '@griffel/react';
import { useGroupChildClassName } from '../AvatarGroupItem/useAvatarGroupItemStyles.styles.css';
import * as styles from './AvatarGroupPopover.module.css';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarGroupPopoverSlots, AvatarGroupPopoverState } from './AvatarGroupPopover.types';

export const avatarGroupPopoverClassNames: SlotClassNames<AvatarGroupPopoverSlots> = {
  root: 'fui-AvatarGroupPopover',
  content: 'fui-AvatarGroupPopover__content',
  popoverSurface: 'fui-AvatarGroupPopover__popoverSurface',
  tooltip: 'fui-AvatarGroupPopover__tooltip',
  triggerButton: 'fui-AvatarGroupPopover__triggerButton',
};

export const useAvatarGroupPopoverStyles_unstable = (state: AvatarGroupPopoverState): AvatarGroupPopoverState => {
  const groupChildClassName = useGroupChildClassName(state.layout, state.size);
  // Popover has no DOM root; independent state classes belong on the trigger.
  // eslint-disable-next-line react-hooks/immutability
  state.triggerButton.className = mergeClasses(
    avatarGroupPopoverClassNames.triggerButton,
    groupChildClassName,
    styles.triggerButton,
    styles[`size${state.size}`],
    styles[state.indicator],
    state.layout === 'pie' && styles.pie,
    state.popoverOpen && styles.open,
    state.triggerButton.className,
  );
  // eslint-disable-next-line react-hooks/immutability
  state.content.className = mergeClasses(avatarGroupPopoverClassNames.content, styles.content, state.content.className);
  // eslint-disable-next-line react-hooks/immutability
  state.popoverSurface.className = mergeClasses(
    avatarGroupPopoverClassNames.popoverSurface,
    styles.popoverSurface,
    state.popoverSurface.className,
  );
  return state;
};
