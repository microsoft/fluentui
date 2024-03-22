import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { DismissFilled, DismissRegular, bundleIcon } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);
/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverTitle properties
 * @param ref - reference to root HTMLElement of TeachingPopoverTitle
 */
export const useTeachingPopoverTitle_unstable = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
  const { dismissButton } = props;

  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const appearance = usePopoverContext_unstable(context => context.appearance);

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
        children: <DismissIcon />,
        onClick: onDismissButtonClick,
        'aria-label': 'dismiss',
        'aria-hidden': true,
      },
      elementType: 'button',
    }),
  };
};
