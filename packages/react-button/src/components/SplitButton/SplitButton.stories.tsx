import * as React from 'react';
import { Meta } from '@storybook/react';
import { SplitButton } from '../../SplitButton';
import descriptionMd from './SplitButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './stories/SplitButtonDefault.stories';
export { Shape } from './stories/SplitButtonShape.stories';
export { Appearance } from './stories/SplitButtonAppearance.stories';
export { Icon } from './stories/SplitButtonIcon.stories';
export { Size } from './stories/SplitButtonSize.stories';
export { SizeSmall } from './stories/SplitButtonSizeSmall.stories';
export { SizeMedium } from './stories/SplitButtonSizeMedium.stories';
export { SizeLarge } from './stories/SplitButtonSizeLarge.stories';
export { Disabled } from './stories/SplitButtonDisabled.stories';
export { WithLongText } from './stories/SplitButtonWithLongText.stories';

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', gap: '1em', flexFlow: 'wrap', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
