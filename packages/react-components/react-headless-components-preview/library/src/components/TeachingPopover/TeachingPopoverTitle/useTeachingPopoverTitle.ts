'use client';

import * as React from 'react';
import { useTeachingPopoverTitleBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { usePopoverContext } from '../../Popover/popoverContext';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

export const useTeachingPopoverTitle = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
  const state = useTeachingPopoverTitleBase_unstable(props, ref);
  const open = usePopoverContext(context => context.open);
  const dismissButtonAutoFocus = usePopoverContext(context => context.dismissButtonAutoFocus);
  const setDismissButtonAutoFocus = usePopoverContext(context => context.setDismissButtonAutoFocus);
  const setOpen = usePopoverContext(context => context.setOpen);
  const setTitleId = usePopoverContext(context => context.setTitleId);
  const generatedTitleId = useId('teaching-popover-title');
  const titleId = props.id ?? generatedTitleId;
  const autoFocus = open && dismissButtonAutoFocus;

  React.useEffect(() => {
    setTitleId(titleId);
    return () => setTitleId('');
  }, [setTitleId, titleId]);

  // The base hook closes through @fluentui/react-popover's context; headless dismisses through its own Popover.
  const dismissButton = slot.optional(props.dismissButton, {
    renderByDefault: false,
    defaultProps: { 'aria-label': 'dismiss', autoFocus, type: 'button' },
    elementType: 'button',
  });
  const markDismissButtonMounted = React.useCallback(
    (element: HTMLButtonElement | null) => {
      if (element && autoFocus) {
        setDismissButtonAutoFocus(false);
      }
    },
    [autoFocus, setDismissButtonAutoFocus],
  );
  const dismissButtonRef = useMergedRefs(dismissButton?.ref, markDismissButtonMounted);
  const onDismissButtonClick = dismissButton?.onClick;
  const handleDismissButtonClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onDismissButtonClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(event, false);
    }
  });

  return {
    ...state,
    root: { ...state.root, id: state.root.id ?? titleId },
    dismissButton: dismissButton && {
      ...dismissButton,
      ref: dismissButtonRef,
      onClick: handleDismissButtonClick,
    },
  };
};
