import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

import { Dismiss16Regular, Lightbulb16Regular } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverHeader properties
 * @param ref - reference to root HTMLElement of TeachingPopoverHeader
 */
export const useTeachingPopoverHeader_unstable = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
  const { dismissButton, icon } = props;

  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);

  const onDismissButtonClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    if (!ev.defaultPrevented) {
      setOpen(ev, false);
    }

    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  });

  return {
    appearance,
    components: {
      root: 'h3',
      dismissButton: 'button',
      icon: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('h3', {
        ref,
        ...props,
      }),
      { elementType: 'h3' },
    ),
    icon: slot.optional(icon, {
      renderByDefault: props.icon !== null, // Users may want to null out icon
      defaultProps: {
        children: <Lightbulb16Regular />,
        'aria-hidden': true,
      },
      elementType: 'div',
    }),
    dismissButton: slot.optional(dismissButton, {
      renderByDefault: true,
      defaultProps: {
        children: <Dismiss16Regular />,
        role: 'img',
        onClick: onDismissButtonClick,
      },
      elementType: 'button',
    }),
  };
};
