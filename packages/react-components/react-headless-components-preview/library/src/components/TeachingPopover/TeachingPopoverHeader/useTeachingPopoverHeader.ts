'use client';

import * as React from 'react';
import { useTeachingPopoverHeaderBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { usePopoverContext } from '../../Popover/popoverContext';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

export const useTeachingPopoverHeader = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
  const state = useTeachingPopoverHeaderBase_unstable(props, ref);
  const open = usePopoverContext(context => context.open);
  const dismissButtonAutoFocus = usePopoverContext(context => context.dismissButtonAutoFocus);
  const setDismissButtonAutoFocus = usePopoverContext(context => context.setDismissButtonAutoFocus);
  const setOpen = usePopoverContext(context => context.setOpen);
  const dismissButtonElementRef = React.useRef<HTMLButtonElement>(null);

  // The base hook closes through @fluentui/react-popover's context; headless dismisses through its own Popover.
  const dismissButton = slot.optional(props.dismissButton, {
    renderByDefault: true,
    defaultProps: { 'aria-label': 'dismiss', type: 'button' },
    elementType: 'button',
  });
  const shouldAutoFocus = open && (dismissButton?.autoFocus ?? dismissButtonAutoFocus);
  const dismissButtonRef = useMergedRefs(dismissButton?.ref, dismissButtonElementRef);

  React.useEffect(() => {
    const element = dismissButtonElementRef.current;
    if (shouldAutoFocus && element && !element.disabled) {
      element.focus();
      if (dismissButtonAutoFocus) {
        setDismissButtonAutoFocus(false);
      }
    }
  }, [dismissButtonAutoFocus, setDismissButtonAutoFocus, shouldAutoFocus]);

  const onDismissButtonClick = dismissButton?.onClick;
  const handleDismissButtonClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onDismissButtonClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(event, false);
    }
  });

  return {
    ...state,
    dismissButton: dismissButton && {
      ...dismissButton,
      ref: dismissButtonRef,
      onClick: handleDismissButtonClick,
    },
  };
};
