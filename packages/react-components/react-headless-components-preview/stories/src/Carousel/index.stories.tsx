import { Carousel } from '@fluentui/react-headless-components-preview/carousel';
import descriptionMd from './CarouselDescription.md';
import './carousel.module.css';

export { Default } from './CarouselDefault.stories';
export { Grouped } from './CarouselGrouped.stories';
export { Autoplay } from './CarouselAutoplay.stories';
export { Controlled } from './CarouselControlled.stories';
export { Static } from './CarouselStatic.stories';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { docs: { description: { component: descriptionMd } } },
};
