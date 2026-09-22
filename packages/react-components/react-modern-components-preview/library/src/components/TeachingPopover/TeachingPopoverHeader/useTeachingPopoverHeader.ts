'use client';

import type * as React from 'react';
import { useTeachingPopoverHeader as useTeachingPopoverHeaderBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

export const useTeachingPopoverHeader = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
  const state = useTeachingPopoverHeaderBase(props, ref);
  const { appearance } = usePopoverAppearanceContext();
  return { ...state, appearance, root: { ...state.root, 'data-appearance': appearance } };
};
