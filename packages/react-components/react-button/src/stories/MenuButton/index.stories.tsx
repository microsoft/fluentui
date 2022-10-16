import { Meta } from '@storybook/react';
import { MenuButton } from '@fluentui/react-components';
import descriptionMd from './MenuButtonDescription.md';
import bestPracticesMd from '../Button/ButtonBestPractices.md';

export { Default } from './MenuButtonDefault.stories';
export { Shape } from './MenuButtonShape.stories';
export { Appearance } from './MenuButtonAppearance.stories';
export { Icon } from './MenuButtonIcon.stories';
export { Size } from './MenuButtonSize.stories';
export { SizeSmall } from './MenuButtonSizeSmall.stories';
export { SizeMedium } from './MenuButtonSizeMedium.stories';
export { SizeLarge } from './MenuButtonSizeLarge.stories';
export { Disabled } from './MenuButtonDisabled.stories';
export { WithLongText } from './MenuButtonWithLongText.stories';

export default {
  title: 'Components/Button/MenuButton',
  component: MenuButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
