'use client';

import { mergeCallbacks, slot, useControllableState } from '@fluentui/react-utilities';
import { useAvatarGroupPopoverBase_unstable } from '@fluentui/react-avatar';
import type { AvatarGroupPopoverBaseProps } from '@fluentui/react-avatar';

import { PopoverSurface } from '../../Popover/PopoverSurface/PopoverSurface';
import type { AvatarGroupPopoverProps, AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/**
 * Returns the state for an AvatarGroupPopover component.
 *
 * The design-agnostic base hook from `@fluentui/react-avatar` drives the
 * triggerButton content (the overflow count / indicator) and the overflow
 * list. Open/close behavior is delegated to the headless `Popover` wrapper, so
 * the popover-behavior props are surfaced on `state.popover` rather than wired
 * into a v9 Popover slot.
 */
export const useAvatarGroupPopover = (props: AvatarGroupPopoverProps): AvatarGroupPopoverState => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    openOnHover,
    openOnContext,
    mouseLeaveDelay,
    positioning,
    withArrow,
    trapFocus,
  } = props;

  const baseState = useAvatarGroupPopoverBase_unstable(props as unknown as AvatarGroupPopoverBaseProps);

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: open,
    defaultState: defaultOpen,
    initialState: false,
  });

  const triggerButton = baseState.triggerButton;

  // eslint-disable-next-line eqeqeq
  if (baseState.layout !== 'pie' && baseState.indicator === 'icon' && triggerButton.children == null) {
    // eslint-disable-next-line react-hooks/immutability
    triggerButton.children = '...';
  }

  const handleOpenChange = mergeCallbacks(onOpenChange, (_event, data) => setPopoverOpen(data.open));

  return {
    count: baseState.count,
    indicator: baseState.indicator,
    layout: baseState.layout,
    popoverOpen,

    components: {
      triggerButton: 'button',
      content: 'ul',
      popoverSurface: PopoverSurface,
    },
    triggerButton,
    content: baseState.content,
    popoverSurface: slot.always(props.popoverSurface, {
      defaultProps: { 'aria-label': 'Overflow', tabIndex: 0 },
      elementType: PopoverSurface,
    }),

    popover: {
      open: popoverOpen,
      onOpenChange: handleOpenChange,
      openOnHover,
      openOnContext,
      mouseLeaveDelay,
      positioning,
      withArrow,
      trapFocus,
    },
  };
};
