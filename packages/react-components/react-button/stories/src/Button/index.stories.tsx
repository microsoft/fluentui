import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-components';
import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

// Import Figma Code Connect configuration
import './Button.figma';

export { Default } from './ButtonDefault.stories';
export { Shape } from './ButtonShape.stories';
export { Appearance } from './ButtonAppearance.stories';
export { Icon } from './ButtonIcon.stories';
export { Size } from './ButtonSize.stories';
export { Disabled } from './ButtonDisabled.stories';
export { Loading } from './ButtonLoading.stories';
export { WithLongText } from './ButtonWithLongText.stories';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
    // Add Figma Code Connect metadata
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/yourfile/yournode', // Replace with actual Figma file URL
    },
    figmaConnect: {
      componentId: 'Button',
      variantProps: ['appearance', 'size', 'shape', 'disabled', 'disabledFocusable', 'iconPosition'],
    },
  },
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['secondary', 'primary', 'outline', 'subtle', 'transparent'],
      defaultValue: 'secondary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'circular', 'square'],
      defaultValue: 'rounded',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabledFocusable: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['before', 'after'],
      defaultValue: 'before',
    },
  },
};

export default meta;
