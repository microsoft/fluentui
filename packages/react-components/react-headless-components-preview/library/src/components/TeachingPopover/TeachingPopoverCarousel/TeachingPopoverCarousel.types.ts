import type { useTeachingPopoverCarouselContextValues_unstable } from '@fluentui/react-teaching-popover';

export type {
  TeachingPopoverCarouselBaseProps as TeachingPopoverCarouselProps,
  TeachingPopoverCarouselBaseState as TeachingPopoverCarouselState,
  TeachingPopoverCarouselSlots,
  TeachingPopoverCarouselContextValues,
} from '@fluentui/react-teaching-popover';

/**
 * Context shared between TeachingPopoverCarousel and its children components.
 *
 * Derived from the v9 `useTeachingPopoverCarouselContextValues_unstable` return
 * type, which is the package's public contract for this shape.
 */
export type TeachingPopoverCarouselContextValues = ReturnType<typeof useTeachingPopoverCarouselContextValues_unstable>;
