import * as React from 'react';
import { Meta } from '@storybook/react';
import { Field } from '@fluentui/react-components';

export { Default } from './FieldDefault.stories';
export { Horizontal } from './FieldHorizontal.stories';
export { Required } from './FieldRequired.stories';
export { Info } from './FieldInfo.stories';
export { Disabled } from './FieldDisabled.stories';
export { Size } from './FieldSize.stories';
export { ValidationMessage } from './FieldValidationMessage.stories';
export { Hint } from './FieldHint.stories';
export { ComponentExamples } from './FieldComponentExamples.stories';
export { RenderFunction } from './FieldRenderFunction.stories';

import descriptionMd from './FieldDescription.md';
import bestPracticesMd from './FieldBestPractices.md';

export default {
  title: 'Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
