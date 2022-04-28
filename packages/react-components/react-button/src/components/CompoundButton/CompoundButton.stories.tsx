import * as React from 'react';
import { Meta } from '@storybook/react';
import { CompoundButton } from '../../CompoundButton';
import descriptionMd from './CompoundButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './stories/CompoundButtonDefault.stories';
export { Shape } from './stories/CompoundButtonShape.stories';
export { Appearance } from './stories/CompoundButtonAppearance.stories';
export { Icon } from './stories/CompoundButtonIcon.stories';
export { Size } from './stories/CompoundButtonSize.stories';
export { Disabled } from './stories/CompoundButtonDisabled.stories';
export { WithLongText } from './stories/CompoundButtonWithLongText.stories';
export { AsToggleButton } from './stories/CompoundButtonAsToggleButton.stories';

export default {
  title: 'Components/CompoundButton',
  component: CompoundButton,
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
