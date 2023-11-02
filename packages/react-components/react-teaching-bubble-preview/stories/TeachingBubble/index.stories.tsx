import { TeachingBubble } from '@fluentui/react-teaching-bubble-preview';
import descriptionMd from './TeachingBubbleDescription.md';

export { Default } from './TeachingBubbleDefault.stories';
export { DefaultBrand } from './TeachingBubbleDefaultBranded.stories';
export { Carousel } from './TeachingBubbleCarousel.stories';
export { CarouselBrand } from './TeachingBubbleCarouselBranded.stories';

export default {
  title: 'Preview Components/TeachingBubble',
  component: TeachingBubble,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
