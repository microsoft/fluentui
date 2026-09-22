'use client';

import type * as React from 'react';
import { useTeachingPopoverTitle as useTeachingPopoverTitleBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

export const useTeachingPopoverTitle = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
  const state = useTeachingPopoverTitleBase(props, ref);
  const { appearance } = usePopoverAppearanceContext();
  return { ...state, appearance, root: { ...state.root, 'data-appearance': appearance } };
};
