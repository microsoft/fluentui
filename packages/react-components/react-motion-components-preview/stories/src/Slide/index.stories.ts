import { Slide } from '@fluentui/react-motion-components-preview';
import SlideDescription from './SlideDescription.md';

export { Default } from './SlideDefault.stories';
export { Snappy } from './SlideSnappy.stories';
export { Relaxed } from './SlideRelaxed.stories';
export { Directions } from './SlideDirections.stories';
export { CardsDemo } from './SlideCardsDemo.stories';

export default {
  title: 'Motion/Components (preview)/Slide',
  component: Slide,
  parameters: {
    docs: {
      description: {
        component: SlideDescription,
      },
    },
  },
};
