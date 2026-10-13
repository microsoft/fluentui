'use client';

import type * as React from 'react';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleBaseProps, TeachingPopoverTitleBaseState } from './TeachingPopoverTitle.types';

/**
 * Base hook that builds TeachingPopoverTitle state for behavior and structure only.
 * Does not bundle/render the dismiss icon and does not read `appearance` from popover context.
 * @param props - TeachingPopoverTitle properties
 * @param ref - reference to root HTMLElement of TeachingPopoverTitle
 */
export const useTeachingPopoverTitleBase_unstable = (
  props: TeachingPopoverTitleBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleBaseState => {
  const { dismissButton } = props;

  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);

  const onDismissButtonClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!ev.defaultPrevented) {
      setOpen(ev, false);
    }

    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  });

  return {
    components: {
      root: 'h2',
      dismissButton: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('h2', {
        ref,
        ...props,
      }),
      { elementType: 'h2' },
    ),
    dismissButton: slot.optional(dismissButton, {
      renderByDefault: false,
      defaultProps: {
        onClick: onDismissButtonClick,
        'aria-label': 'dismiss',
        'aria-hidden': true,
      },
      elementType: 'button',
    }),
  };
};
