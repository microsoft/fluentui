'use client';

import type * as React from 'react';
import { useTeachingPopoverTitleBase_unstable } from '@fluentui/react-teaching-popover';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { useTeachingPopoverDismissButton } from '../useTeachingPopoverDismissButton';

export const useTeachingPopoverTitle = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
  const state = useTeachingPopoverTitleBase_unstable(props, ref);
  return {
    ...state,
    dismissButton: useTeachingPopoverDismissButton(props.dismissButton),
  };
};
