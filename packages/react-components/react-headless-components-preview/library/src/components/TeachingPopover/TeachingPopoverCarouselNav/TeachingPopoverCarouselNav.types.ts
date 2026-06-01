import type { TeachingPopoverCarouselNavBaseState } from '@fluentui/react-teaching-popover';

export type {
  TeachingPopoverCarouselNavBaseProps as TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavBaseState as TeachingPopoverCarouselNavState,
  TeachingPopoverCarouselNavSlots,
} from '@fluentui/react-teaching-popover';

/**
 * Render function for the carousel nav buttons.
 *
 * Derived from the v9 `TeachingPopoverCarouselNavBaseState.renderNavButton`
 * field, which is the package's public contract for this shape.
 */
export type NavButtonRenderFunction = TeachingPopoverCarouselNavBaseState['renderNavButton'];
