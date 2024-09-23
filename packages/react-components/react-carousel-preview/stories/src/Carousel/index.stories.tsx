import {
  Carousel,
  CarouselAutoplayButton,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselDescription.md';
import bestPracticesMd from './CarouselBestPractices.md';

export { Default } from './CarouselDefault.stories';
export { Responsive } from './CarouselResponsive.stories';
export { Controlled } from './CarouselControlled.stories';
export { ImageSlideshow } from './CarouselImageBox.stories';
export { AlignmentAndWhitespace } from './CarouselActionCards.stories';
export { Autoplay } from './CarouselAutoplay.stories';

export default {
  title: 'Preview Components/Carousel',
  component: Carousel,
  subcomponents: {
    CarouselAutoplayButton,
    CarouselButton,
    CarouselCard,
    CarouselNav,
    CarouselNavButton,
    CarouselNavContainer,
    CarouselNavImageButton,
    CarouselSlider,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
