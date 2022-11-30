import * as React from 'react';

import descriptionMd from './Description.md';
import { Meta } from '@storybook/react';
import { Fluent2ForV8ThemeDemo } from './DemoComponents/ThemeDemoPage';

export const Default = () => {
  return <Fluent2ForV8ThemeDemo />;
};

export default {
  title: 'Migration Shims/Theme/Fleuent2ThemeForV8',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
