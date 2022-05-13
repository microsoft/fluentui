import { Textarea } from '../index';

import descriptionMd from './TextareaDescription.md';
import bestPracticesMd from './TextareaBestPractices.md';

export { Default } from './TextareaDefault.stories';
export { Appearance } from './TextareaAppearance.stories';
export { Controlled } from './TextareaControlled.stories';
export { Disabled } from './TextareaDisabled.stories';
export { Placeholder } from './TextareaPlaceholder.stories';
export { Resize } from './TextareaResize.stories';
export { Size } from './TextareaSize.stories';
export { Uncontrolled } from './TextareaUncontrolled.stories';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
