import { Default as Rotate } from './RotateDefault.stories';
import RotateDescription from './RotateDescription.md';

export { Default } from './RotateDefault.stories';
export { CardFlip } from './RotateCardFlip.stories';

export default {
  title: 'Motion/Components (preview)/Rotate',
  component: Rotate,
  parameters: {
    docs: {
      description: {
        component: RotateDescription,
      },
    },
  },
};
