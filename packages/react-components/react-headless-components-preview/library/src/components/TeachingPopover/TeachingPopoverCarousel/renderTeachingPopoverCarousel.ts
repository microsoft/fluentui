import * as React from 'react';
import { TeachingPopoverCarouselFocusProvider } from './teachingPopoverCarouselFocusContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export const renderTeachingPopoverCarousel: (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
) => JSXElement = (state, contextValues) =>
  React.createElement(TeachingPopoverCarouselFocusProvider, { state, contextValues });
