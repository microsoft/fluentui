import * as React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-button';
import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export { Default } from './ButtonDefault.stories';
export { Shape } from './ButtonShape.stories';
export { Appearance } from './ButtonAppearance.stories';
export { Icon } from './ButtonIcon.stories';
export { Size } from './ButtonSize.stories';
export { Disabled } from './ButtonDisabled.stories';
export { WithLongText } from './ButtonWithLongText.stories';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
