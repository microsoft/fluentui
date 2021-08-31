import * as React from 'react';
import { Button } from '../../Button';
import { Meta } from '@storybook/react';

import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export { Emphasis } from './ButtonEmphasis.stories';
export { Default } from './ButtonDefault.stories';
export { Disabled } from './ButtonDisabled.stories';
export { WithIcon } from './ButtonWithIcon.stories';
export { Circular } from './ButtonCircular.stories';
export { Size } from './ButtonSize.stories';
export { Block } from './ButtonBlock.stories';
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
