'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { useAvatarGroupPopoverContextValues } from '@fluentui/react-headless-components-preview/avatar-group';
import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';
import { renderAvatarGroupPopover } from './renderAvatarGroupPopover';
import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverStyles } from './useAvatarGroupPopoverStyles.styles';

/** Renders overflowed AvatarGroupItems in a popover. */
export const AvatarGroupPopover = (props: AvatarGroupPopoverProps): JSXElement => {
  const state = useAvatarGroupPopover(props);
  const contextValues = useAvatarGroupPopoverContextValues(state);

  useAvatarGroupPopoverStyles(state);
  return renderAvatarGroupPopover(state, contextValues);
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';
