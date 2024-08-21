import { Meta } from '@storybook/react';

import descriptionMd from './createCSSRuleFromThemeDescription.md';
import bestPracticesMd from './createCSSRuleFromThemeBestPractices.md';

export { Default } from './createCSSRuleFromThemeDefault.stories';
export { Switching } from './createCSSRuleFromThemeSwitching.stories';

const meta: Meta = {
  title: 'Utilities/Theme/createCSSRuleFromTheme',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export default meta;
