import { renderTeachingPopoverCarousel_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

/**
 * Cast to v9's render signature — base state omits `appearance` and the
 * render only reads the root slot and wraps with `CarouselProvider`.
 */
export const renderTeachingPopoverCarousel = (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
): JSXElement =>
  renderTeachingPopoverCarousel_unstable(
    state as Parameters<typeof renderTeachingPopoverCarousel_unstable>[0],
    contextValues,
  );
