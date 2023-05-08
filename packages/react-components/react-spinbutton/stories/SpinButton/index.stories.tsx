import { Meta } from '@storybook/react';
import { SpinButton } from '@fluentui/react-components';

import descriptionMd from './SpinButtonDescription.md';
import bestPracticesMd from './SpinButtonBestPractices.md';

export { Default } from './SpinButtonDefault.stories';
export { Controlled } from './SpinButtonControlled.stories';
export { Uncontrolled } from './SpinButtonUncontrolled.stories';
export { Bounds } from './SpinButtonBounds.stories';
export { DisplayValue } from './SpinButtonDisplayValue.stories';
export { Step } from './SpinButtonStep.stories';
export { Size } from './SpinButtonSize.stories';
export { Appearance } from './SpinButtonAppearance.stories';
export { Disabled } from './SpinButtonDisabled.stories';

const meta: Meta = {
  title: 'Components/SpinButton',
  component: SpinButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export default meta;
