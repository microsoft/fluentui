'use client';

import type * as React from 'react';
import { useTeachingPopoverHeaderBase_unstable } from '@fluentui/react-teaching-popover';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import { useTeachingPopoverDismissButton } from '../useTeachingPopoverDismissButton';

export const useTeachingPopoverHeader = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
  const state = useTeachingPopoverHeaderBase_unstable(props, ref);
  return {
    ...state,
    dismissButton: useTeachingPopoverDismissButton(props.dismissButton),
  };
};
