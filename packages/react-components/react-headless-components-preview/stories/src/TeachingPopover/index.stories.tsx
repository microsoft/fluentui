import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselFooterButton,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import descriptionMd from './TeachingPopoverDescription.md';

export { Default } from './TeachingPopoverDefault.stories';
export { WithCarousel } from './TeachingPopoverWithCarousel.stories';

export default {
  title: 'Components/TeachingPopover',
  component: TeachingPopover,
  subcomponents: {
    TeachingPopoverBody,
    TeachingPopoverCarousel,
    TeachingPopoverCarouselCard,
    TeachingPopoverCarouselFooter,
    TeachingPopoverCarouselFooterButton,
    TeachingPopoverCarouselNav,
    TeachingPopoverCarouselNavButton,
    TeachingPopoverCarouselPageCount,
    TeachingPopoverFooter,
    TeachingPopoverHeader,
    TeachingPopoverSurface,
    TeachingPopoverTitle,
    TeachingPopoverTrigger,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
