import * as React from 'react';
import { getIntrinsicElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { TeachingBubbleTitleProps, TeachingBubbleTitleState } from './TeachingBubbleTitle.types';
import { DismissFilled, DismissRegular, bundleIcon } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);
/**
 * Returns the props and state required to render the component
 * @param props - TeachingBubbleTitle properties
 * @param ref - reference to root HTMLElement of TeachingBubbleTitle
 */
export const useTeachingBubbleTitle_unstable = (
  props: TeachingBubbleTitleProps,
  ref: React.Ref<HTMLElement>,
): TeachingBubbleTitleState => {
  const { as, dismissButton, showDismiss } = props;

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
    required: showDismiss,
    defaultProps: {
      type: 'button',
      children: <DismissIcon />,
    },
  });

  return {
    showDismiss,
    components: {
      root: 'div',
      dismissButton: 'button',
    },
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      role: 'heading',
      'aria-level': 2,
      ...props,
    }),
    dismissButton: {
      ...dismissButtonShorthand,
      onClick: onDismissButtonClick,
    },
  };
};
