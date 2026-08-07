import { Meta } from '@storybook/react-webpack5';

import descriptionMd from './ThemeClassesDescription.md';
import bestPracticesMd from './ThemeClassesBestPractices.md';

export { Default } from './ThemeClassesDefault.stories';
export { Switching } from './ThemeClassesSwitching.stories';
export { CustomThemeClass } from './ThemeClassesCustom.stories';

export default {
  title: 'Utilities/Theme/ThemeClasses',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
      hideArgsTable: true,
    },
  },
} as Meta;
