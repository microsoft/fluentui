import * as React from 'react';
import { Meta } from '@storybook/react';
import { ToggleButton } from '@fluentui/react-button';
import descriptionMd from './ToggleButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './ToggleButtonDefault.stories';
export { Shape } from './ToggleButtonShape.stories';
export { Appearance } from './ToggleButtonAppearance.stories';
export { Icon } from './ToggleButtonIcon.stories';
export { Size } from './ToggleButtonSize.stories';
export { Disabled } from './ToggleButtonDisabled.stories';
export { Checked } from './ToggleButtonChecked.stories';
export { WithLongText } from './ToggleButtonWithLongText.stories';

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
