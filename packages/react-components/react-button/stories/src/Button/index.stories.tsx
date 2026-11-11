import type { Meta } from '@storybook/react-webpack5';
import { Button, buttonClassNames } from '@fluentui/react-components';
import type { FluentParameters } from '@fluentui/react-storybook-addon';
import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

export { Default } from './ButtonDefault.stories';
export { Shape } from './ButtonShape.stories';
export { Appearance } from './ButtonAppearance.stories';
export { Icon } from './ButtonIcon.stories';
export { Size } from './ButtonSize.stories';
export { Disabled } from './ButtonDisabled.stories';
export { Loading } from './ButtonLoading.stories';
export { WithLongText } from './ButtonWithLongText.stories';

export default {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    reactStorybookAddon: {
      slotClassNameGroups: [{ exportName: 'buttonClassNames', slots: buttonClassNames }],
    },
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  } satisfies FluentParameters,
} as Meta;
