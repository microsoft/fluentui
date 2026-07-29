'use client';

import type { JSXElement } from '@fluentui/react-utilities';

import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';
import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverContextValues } from './useAvatarGroupPopoverContextValues';
import { renderAvatarGroupPopover } from './renderAvatarGroupPopover';

/**
 * The AvatarGroupPopover renders the overflowed AvatarGroupItems of an AvatarGroup
 * inside a headless Popover, triggered by a button showing the overflow count.
 */
export const AvatarGroupPopover = (props: AvatarGroupPopoverProps): JSXElement => {
  const state = useAvatarGroupPopover(props);
  const contextValues = useAvatarGroupPopoverContextValues(state);

  return renderAvatarGroupPopover(state, contextValues);
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';
