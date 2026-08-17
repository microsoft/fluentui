'use client';

import * as React from 'react';
import { DismissFilled, DismissRegular, bundleIcon } from '@fluentui/react-icons';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { useTeachingPopoverTitleBase_unstable } from './useTeachingPopoverTitleBase';

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
  const baseState = useTeachingPopoverTitleBase_unstable(props, ref);
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const dismissButton =
    baseState.dismissButton && baseState.dismissButton.children === undefined
      ? { ...baseState.dismissButton, children: <DismissIcon /> }
      : baseState.dismissButton;

  return {
    ...baseState,
    appearance,
    dismissButton,
  };
};
