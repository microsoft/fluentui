import { Meta } from '@storybook/react';
import { Input } from '../index';

import descriptionMd from './InputDescription.md';
export * from './InputDefault.stories';
export * from './InputAppearance.stories';
export * from './InputContentBeforeAfter.stories';
export * from './InputDisabled.stories';
export * from './InputInline.stories';
export * from './InputPlaceholder.stories';
export * from './InputSize.stories';
export * from './InputType.stories';
export * from './InputUncontrolled.stories';
export * from './InputControlled.stories';

const meta: Meta = {
  title: 'Preview Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};

export default meta;
