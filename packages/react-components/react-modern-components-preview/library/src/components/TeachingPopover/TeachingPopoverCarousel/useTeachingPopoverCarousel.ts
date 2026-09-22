'use client';

import type * as React from 'react';
import { useTeachingPopoverCarousel as useTeachingPopoverCarouselBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

export { useTeachingPopoverCarouselContextValues } from '@fluentui/react-headless-components-preview/teaching-popover';

export const useTeachingPopoverCarousel = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const state = useTeachingPopoverCarouselBase(props, ref);
  const { appearance } = usePopoverAppearanceContext();
  return { ...state, appearance, root: { ...state.root, 'data-appearance': appearance } };
};
