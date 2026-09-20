import type { Meta } from '@storybook/react-webpack5';
import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';
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
  title: 'Components/CompoundButton/CompoundButton',
  component: CompoundButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
