import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterProps, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import { Button } from '@fluentui/react-button';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverFooter properties
 * @param ref - reference to root HTMLElement of TeachingPopoverFooter
 */
export const useTeachingPopoverFooter_unstable = (
  props: TeachingPopoverFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverFooterState => {
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const handleButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      if (event.isDefaultPrevented()) {
        return;
      }

      if (triggerRef.current) {
        triggerRef.current.focus();
      }
      toggleOpen(event);
    },
  );

  const secondary = slot.optional(props.secondary, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'primary' : undefined,
      children: props.strings.secondary,
    },
    renderByDefault: true,
    elementType: Button,
  });

  // Merge any provided callback with close trigger
  if (secondary) {
    secondary.onClick = mergeCallbacks(handleButtonClick, secondary?.onClick);
  }

  const primary = slot.always(props.primary, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
      children: props.strings.primary,
    },
    elementType: Button,
  });

  return {
    footerLayout: props.footerLayout ?? 'horizontal',
    appearance,
    components: {
      root: 'div',
      primary: Button,
      secondary: Button,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    secondary,
    primary,
  };
};
