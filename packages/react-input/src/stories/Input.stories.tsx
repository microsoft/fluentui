import * as React from 'react';
import { Meta } from '@storybook/react';
import { Input } from '../index';

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
  title: 'Components-alpha/Input',
  component: Input,

  decorators: [
    (Story, context) => (
      <div
        style={{
          ...(context.viewMode === 'docs' && {
            // docs mode has buttons on the bottom right which cover the input
            // if it's allowed to be full width
            maxWidth: '500px',
            // and the corners of the rounded box clip the example
            padding: '24px',
          }),
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
