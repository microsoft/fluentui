import * as React from 'react';
import { getIntrinsicElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { TeachingBubbleHeaderProps, TeachingBubbleHeaderState } from './TeachingBubbleHeader.types';

import { Dismiss16Regular, Lightbulb16Regular } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingBubbleHeader properties
 * @param ref - reference to root HTMLElement of TeachingBubbleHeader
 */
export const useTeachingBubbleHeader_unstable = (
  props: TeachingBubbleHeaderProps,
  ref: React.Ref<HTMLElement>,
): TeachingBubbleHeaderState => {
  const { as, dismissButton, icon } = props;

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

  const dismissButtonShorthand = resolveShorthand(dismissButton, {
    required: true,
    defaultProps: {
      type: 'button',
      children: <Dismiss16Regular />,
    },
  });

  const iconShorthand = resolveShorthand(icon, {
    required: props.icon !== null,
    defaultProps: {
      children: <Lightbulb16Regular />,
      'aria-hidden': true,
    },
  });

  return {
    components: {
      root: 'div',
      dismissButton: 'button',
      icon: 'div',
    },
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      role: 'heading',
      'aria-level': 1,
      ...props,
    }),
    icon: iconShorthand,
    dismissButton: {
      ...dismissButtonShorthand,
      onClick: onDismissButtonClick,
    },
  };
};
