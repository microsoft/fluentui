'use client';

import type * as React from 'react';
import { slot, useEventCallback } from '@fluentui/react-utilities';
import { usePopoverContext } from '../Popover/popoverContext';
import type {
  TeachingPopoverHeaderProps,
  TeachingPopoverHeaderState,
} from './TeachingPopoverHeader/TeachingPopoverHeader.types';

export const useTeachingPopoverDismissButton = (
  props: TeachingPopoverHeaderProps['dismissButton'],
): TeachingPopoverHeaderState['dismissButton'] => {
  const setOpen = usePopoverContext(context => context.setOpen);
  const dismissButton = slot.optional(props, {
    renderByDefault: true,
    defaultProps: { 'aria-label': 'dismiss', type: 'button', autoFocus: true },
    elementType: 'button',
  });
  const onClick = dismissButton?.onClick;
  const handleClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(event, false);
    }
  });

  return dismissButton && { ...dismissButton, onClick: handleClick };
};
