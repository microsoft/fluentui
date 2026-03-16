import { Blur } from '@fluentui/react-motion-components-preview';
import BlurDescription from './BlurDescription.md';

export { Default } from './BlurDefault.stories';
export { Radius } from './BlurRadius.stories';
export { Duration } from './BlurDuration.stories';
export { Opacity } from './BlurOpacity.stories';
export { LayeredBlurDemo } from './BlurDemo.stories';

export default {
  title: 'Motion/Components (preview)/Blur',
  component: Blur,
  parameters: {
    docs: {
      description: {
        component: BlurDescription,
      },
    },
  },
};
