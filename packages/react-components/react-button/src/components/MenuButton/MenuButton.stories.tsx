import * as React from 'react';
import { Meta } from '@storybook/react';
import { MenuButton } from '../../MenuButton';
import descriptionMd from './MenuButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './stories/MenuButtonDefault.stories';
export { Shape } from './stories/MenuButtonShape.stories';
export { Appearance } from './stories/MenuButtonAppearance.stories';
export { Icon } from './stories/MenuButtonIcon.stories';
export { Size } from './stories/MenuButtonSize.stories';
export { SizeSmall } from './stories/MenuButtonSizeSmall.stories';
export { SizeMedium } from './stories/MenuButtonSizeMedium.stories';
export { SizeLarge } from './stories/MenuButtonSizeLarge.stories';
export { Disabled } from './stories/MenuButtonDisabled.stories';
export { WithLongText } from './stories/MenuButtonWithLongText.stories';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
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
