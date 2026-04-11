'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverHeaderBaseProps,
  TeachingPopoverHeaderBaseState,
  TeachingPopoverHeaderProps,
  TeachingPopoverHeaderState,
} from './TeachingPopoverHeader.types';

import { Dismiss12Regular, Lightbulb16Regular } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

/**
 * Returns the base props and state required to render the component, without design-specific props.
 * @param props - TeachingPopoverHeader properties
 * @param ref - reference to root HTMLElement of TeachingPopoverHeader
 */
export const useTeachingPopoverHeaderBase_unstable = (
  props: TeachingPopoverHeaderBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderBaseState => {
  const { dismissButton, icon } = props;

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
      root: 'div',
      dismissButton: 'button',
      icon: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    icon: slot.optional(icon, {
      renderByDefault: true,
      defaultProps: {
        children: <Lightbulb16Regular />,
        'aria-hidden': true,
      },
      elementType: 'div',
    }),
    dismissButton: slot.optional(dismissButton, {
      renderByDefault: true,
      defaultProps: {
        children: <Dismiss12Regular />,
        role: 'button',
        'aria-label': 'dismiss',
        onClick: onDismissButtonClick,
      },
      elementType: 'button',
    }),
  };
};

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverHeader properties
 * @param ref - reference to root HTMLElement of TeachingPopoverHeader
 */
export const useTeachingPopoverHeader_unstable = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const baseState = useTeachingPopoverHeaderBase_unstable(props, ref);

  return {
    ...baseState,
    appearance,
  };
};
