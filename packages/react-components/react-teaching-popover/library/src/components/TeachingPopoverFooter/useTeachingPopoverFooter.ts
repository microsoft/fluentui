'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import type {
  TeachingPopoverFooterBaseProps,
  TeachingPopoverFooterBaseState,
  TeachingPopoverFooterProps,
  TeachingPopoverFooterState,
} from './TeachingPopoverFooter.types';
import { Button } from '@fluentui/react-button';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

/**
 * Base hook that builds TeachingPopoverFooter state for behavior and structure only.
 * Does not read `appearance` from the popover context and does not build the
 * `primary` / `secondary` Button slots — those are styling concerns and are
 * constructed by the styled hook.
 * @param props - TeachingPopoverFooter properties
 * @param ref - reference to root HTMLElement of TeachingPopoverFooter
 */
export const useTeachingPopoverFooterBase_unstable = (
  props: TeachingPopoverFooterBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverFooterBaseState => {
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const handleButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      if (event.isDefaultPrevented()) {
        return;
      }

      toggleOpen(event);
    },
  );

  return {
    footerLayout: props.footerLayout ?? 'horizontal',
    handleButtonClick,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverFooter properties
 * @param ref - reference to root HTMLElement of TeachingPopoverFooter
 */
export const useTeachingPopoverFooter_unstable = (
  props: TeachingPopoverFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverFooterState => {
  const baseState = useTeachingPopoverFooterBase_unstable(props, ref);
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const isBrand = appearance === 'brand';
  const primaryDefaultAppearance = isBrand ? undefined : 'primary';
  const secondaryDefaultAppearance = isBrand ? 'primary' : undefined;

  const secondary = slot.optional(props.secondary, {
    defaultProps: {
      appearance: secondaryDefaultAppearance,
    },
    renderByDefault: props.secondary !== undefined,
    elementType: Button,
  });

  if (secondary) {
    secondary.onClick = mergeCallbacks(baseState.handleButtonClick, secondary?.onClick);
  }

  const primary = slot.always(props.primary, {
    defaultProps: {
      appearance: primaryDefaultAppearance,
    },
    elementType: Button,
  });

  if (!secondary) {
    primary.onClick = mergeCallbacks(baseState.handleButtonClick, primary?.onClick);
  }

  return {
    footerLayout: baseState.footerLayout,
    appearance,
    components: {
      root: 'div',
      primary: Button,
      secondary: Button,
    },
    root: baseState.root,
    secondary,
    primary,
  };
};
