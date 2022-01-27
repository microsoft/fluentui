import * as React from 'react';
import { Meta } from '@storybook/react';
import { ToggleButton } from '../../ToggleButton';
import descriptionMd from './ToggleButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './stories/ToggleButtonDefault.stories';
export { Shape } from './stories/ToggleButtonShape.stories';
export { Appearance } from './stories/ToggleButtonAppearance.stories';
export { Icon } from './stories/ToggleButtonIcon.stories';
export { Size } from './stories/ToggleButtonSize.stories';
export { Disabled } from './stories/ToggleButtonDisabled.stories';
export { Checked } from './stories/ToggleButtonChecked.stories';
export { WithLongText } from './stories/ToggleButtonWithLongText.stories';

export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
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
