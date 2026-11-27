// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Carousel,
  CarouselAutoplayButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
} from '@fluentui/react-headless-components-preview/carousel';

console.log(
  Carousel,
  CarouselAutoplayButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
);

export default {
  name: '@fluentui/react-headless-components-preview/carousel',
};
