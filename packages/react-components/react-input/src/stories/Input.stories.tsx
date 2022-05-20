import { Meta } from '@storybook/react';
import { Input } from '../index';

import descriptionMd from './InputDescription.md';
import bestPracticesMd from './InputBestPractices.md';

export { Default } from './InputDefault.stories';
export { Appearance } from './InputAppearance.stories';
export { ContentBeforeAfter } from './InputContentBeforeAfter.stories';
export { Disabled } from './InputDisabled.stories';
export { Inline } from './InputInline.stories';
export { Placeholder } from './InputPlaceholder.stories';
export { Size } from './InputSize.stories';
export { Type } from './InputType.stories';
export { Uncontrolled } from './InputUncontrolled.stories';
export { Controlled } from './InputControlled.stories';

const meta: Meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export default meta;
