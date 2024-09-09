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
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const handleButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      if (event.isDefaultPrevented()) {
        return;
      }

      toggleOpen(event);
    },
  );

  const secondary = slot.optional(props.secondary, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'primary' : undefined,
    },
    renderByDefault: props.secondary !== undefined,
    elementType: Button,
  });

  // Merge any provided callback with close trigger
  if (secondary) {
    secondary.onClick = mergeCallbacks(handleButtonClick, secondary?.onClick);
  }

  const primary = slot.always(props.primary, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
    },
    elementType: Button,
  });

  // Primary button will close the popover if no secondary action is available.
  if (!secondary) {
    primary.onClick = mergeCallbacks(handleButtonClick, primary?.onClick);
  }

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
