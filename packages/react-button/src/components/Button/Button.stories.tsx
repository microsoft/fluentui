import * as React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '../../Button';
import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export { Default } from './stories/ButtonDefault.stories';
export { Shape } from './stories/ButtonShape.stories';
export { Appearance } from './stories/ButtonAppearance.stories';
export { Icon } from './stories/ButtonIcon.stories';
export { Size } from './stories/ButtonSize.stories';
export { Disabled } from './stories/ButtonDisabled.stories';
export { WithLongText } from './stories/ButtonWithLongText.stories';

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
