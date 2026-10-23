/* eslint-disable import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption */
import {
  TeachingPopover as GriffelTeachingPopover,
  TeachingPopoverBody as GriffelTeachingPopoverBody,
  TeachingPopoverCarousel as GriffelTeachingPopoverCarousel,
  TeachingPopoverCarouselCard as GriffelTeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter as GriffelTeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav as GriffelTeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton as GriffelTeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount as GriffelTeachingPopoverCarouselPageCount,
  TeachingPopoverHeader as GriffelTeachingPopoverHeader,
  TeachingPopoverSurface as GriffelTeachingPopoverSurface,
  TeachingPopoverTitle as GriffelTeachingPopoverTitle,
  TeachingPopoverTrigger as GriffelTeachingPopoverTrigger,
} from '@fluentui/react-components';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-windmod-preview/teaching-popover';

/** windmod's surfaces share one top layer, so a scene that pins several open needs the manual hint
 *  mode; Griffel portals each surface to its own node and needs nothing. */
export const windmodParts = {
  TeachingPopover: TeachingPopover as never,
  TeachingPopoverTrigger: TeachingPopoverTrigger as never,
  TeachingPopoverSurface: TeachingPopoverSurface as never,
  TeachingPopoverHeader: TeachingPopoverHeader as never,
  TeachingPopoverTitle: TeachingPopoverTitle as never,
  TeachingPopoverBody: TeachingPopoverBody as never,
  TeachingPopoverCarousel: TeachingPopoverCarousel as never,
  TeachingPopoverCarouselCard: TeachingPopoverCarouselCard as never,
  TeachingPopoverCarouselFooter: TeachingPopoverCarouselFooter as never,
  TeachingPopoverCarouselNav: TeachingPopoverCarouselNav as never,
  TeachingPopoverCarouselNavButton: TeachingPopoverCarouselNavButton as never,
  TeachingPopoverCarouselPageCount: TeachingPopoverCarouselPageCount as never,
  surfaceProps: { popover: 'manual' },
  footerProps: {
    previous: { navType: 'prev', children: 'Previous', altText: 'Close' },
    next: { navType: 'next', children: 'Next', altText: 'Finish' },
  } as Record<string, unknown>,
};

export const griffelParts = {
  TeachingPopover: GriffelTeachingPopover as never,
  TeachingPopoverTrigger: GriffelTeachingPopoverTrigger as never,
  TeachingPopoverSurface: GriffelTeachingPopoverSurface as never,
  TeachingPopoverHeader: GriffelTeachingPopoverHeader as never,
  TeachingPopoverTitle: GriffelTeachingPopoverTitle as never,
  TeachingPopoverBody: GriffelTeachingPopoverBody as never,
  TeachingPopoverCarousel: GriffelTeachingPopoverCarousel as never,
  TeachingPopoverCarouselCard: GriffelTeachingPopoverCarouselCard as never,
  TeachingPopoverCarouselFooter: GriffelTeachingPopoverCarouselFooter as never,
  TeachingPopoverCarouselNav: GriffelTeachingPopoverCarouselNav as never,
  TeachingPopoverCarouselNavButton: GriffelTeachingPopoverCarouselNavButton as never,
  TeachingPopoverCarouselPageCount: GriffelTeachingPopoverCarouselPageCount as never,
  surfaceProps: {},
  footerProps: {
    initialStepText: 'Close',
    finalStepText: 'Finish',
    previous: 'Previous',
    next: 'Next',
  } as Record<string, unknown>,
};
