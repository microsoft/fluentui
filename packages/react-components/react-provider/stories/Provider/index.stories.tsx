import { Meta } from '@storybook/react';

import { FluentProvider } from '@fluentui/react-components';
import descriptionMd from './FluentProviderDescription.md';
import bestPracticesMd from './FluentProviderBestPractices.md';

export { Default } from './FluentProviderDefault.stories';
export { Dir } from './FluentProviderDir.stories';
export { ApplyStylesToPortals } from './FluentProviderApplyStylesToPortals.stories';
export { Nested } from './FluentProviderNested.stories';
export { Frame } from './FluentProviderFrame.stories';

export default {
  title: 'Components/FluentProvider',
  component: FluentProvider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
