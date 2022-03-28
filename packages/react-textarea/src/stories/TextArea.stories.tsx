import { TextArea } from '../index';

import descriptionMd from './TextAreaDescription.md';

export { Default } from './TextAreaDefault.stories';
export { Appearance } from './TextAreaAppearance.stories';
export { Controlled } from './TextAreaControlled.stories';
export { Disabled } from './TextAreaDisabled.stories';
export { Placeholder } from './TextAreaPlaceholder.stories';
export { Resize } from './TextAreaResize.stories';
export { Size } from './TextAreaSize.stories';
export { Uncontrolled } from './TextAreaUncontrolled.stories';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
