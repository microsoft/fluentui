import { renderTeachingPopoverCarousel_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export const renderTeachingPopoverCarousel = renderTeachingPopoverCarousel_unstable as (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
) => JSXElement;
