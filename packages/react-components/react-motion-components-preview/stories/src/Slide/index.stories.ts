import { DefaultSlide as Slide } from './Slide.stories';
import SlideDescription from './SlideDescription.md';

export { Default } from './SlideDefault.stories';
export { Snappy } from './SlideSnappy.stories';
export { Relaxed } from './SlideRelaxed.stories';
export { Customization } from './SlideCustomization.stories';
export { UnitsAndPercentages } from './SlideUnits.stories';
export { Showcase } from './SlideShowcase.stories';
export { SequentialAnimation } from './SlideSequential.stories';

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