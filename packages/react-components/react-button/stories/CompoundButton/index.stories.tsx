import { Meta } from '@storybook/react';
import { CompoundButton } from '@fluentui/react-components';
import descriptionMd from './CompoundButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './CompoundButtonDefault.stories';
export { Shape } from './CompoundButtonShape.stories';
export { Appearance } from './CompoundButtonAppearance.stories';
export { Icon } from './CompoundButtonIcon.stories';
export { Size } from './CompoundButtonSize.stories';
export { Disabled } from './CompoundButtonDisabled.stories';
export { WithLongText } from './CompoundButtonWithLongText.stories';

export default {
  title: 'Components/Button/CompoundButton',
  component: CompoundButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
