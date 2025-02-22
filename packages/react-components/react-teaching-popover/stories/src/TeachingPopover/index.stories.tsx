import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-components';
import descriptionMd from './TeachingPopoverDescription.md';

export { Default } from './TeachingPopoverDefault.stories';
export { AppearanceBrand } from './TeachingPopoverAppearanceBrand.stories';
export { Carousel } from './TeachingPopoverCarousel.stories';
export { CarouselBrand } from './TeachingPopoverCarouselAppearanceBrand.stories';
export { CarouselText } from './TeachingPopoverCarouselText.stories';

export default {
  title: 'Components/TeachingPopover',
  component: TeachingPopover,
  subcomponents: {
    TeachingPopoverBody,
    TeachingPopoverCarousel,
    TeachingPopoverCarouselCard,
    TeachingPopoverCarouselFooter,
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
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
