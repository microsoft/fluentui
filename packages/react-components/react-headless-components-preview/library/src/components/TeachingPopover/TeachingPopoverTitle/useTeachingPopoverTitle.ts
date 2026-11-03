'use client';

import type * as React from 'react';
import { useTeachingPopoverTitleBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useEventCallback } from '@fluentui/react-utilities';
import { usePopoverContext } from '../../Popover/popoverContext';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

export const useTeachingPopoverTitle = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
  const state = useTeachingPopoverTitleBase_unstable(props, ref);
  const setOpen = usePopoverContext(context => context.setOpen);

  // The base hook closes through @fluentui/react-popover's context; headless dismisses through its own Popover.
  const dismissButton = slot.optional(props.dismissButton, {
    renderByDefault: true,
    defaultProps: { 'aria-label': 'dismiss', type: 'button', autoFocus: true },
    elementType: 'button',
  });
  const onDismissButtonClick = dismissButton?.onClick;
  const handleDismissButtonClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onDismissButtonClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(event, false);
    }
  });

  return {
    ...state,
    dismissButton: dismissButton && { ...dismissButton, onClick: handleDismissButtonClick },
  };
};
