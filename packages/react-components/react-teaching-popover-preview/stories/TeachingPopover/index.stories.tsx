import { TeachingPopover } from '@fluentui/react-teaching-popover-preview';
import descriptionMd from './TeachingPopoverDescription.md';

export { Default } from './TeachingPopoverDefault.stories';
export { DefaultBrand } from './TeachingPopoverDefaultBranded.stories';
export { Carousel } from './TeachingPopoverCarousel.stories';
export { CarouselBrand } from './TeachingPopoverCarouselBranded.stories';
export { CarouselText } from './TeachingPopoverCarouselText.stories';

export default {
  title: 'Preview Components/TeachingPopover',
  component: TeachingPopover,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
