import * as React from 'react';
import { Button } from '../../Button';
import { Meta } from '@storybook/react';

import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export { Emphasis } from './ButtonEmphasis.stories';
export { Default } from './ButtonDefault.stories';
export { ButtonDisabled } from './ButtonDisabled.stories';
export { ButtonWithIcon } from './ButtonWithIcon.stories';
export { ButtonCircular } from './ButtonCircular.stories';
export { ButtonSize } from './ButtonSize.stories';
export { ButtonBlock } from './ButtonBlock.stories';
export { ButtonWithLongText } from './ButtonWithLongText.stories';

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
