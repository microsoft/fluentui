import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import bestPracticesMd from './FileTypeIconBestPractices.md';

export const BestPractices = (): JSXElement => {
  return <></>;
};

BestPractices.storyName = 'Best Practices';

BestPractices.parameters = {
  docs: {
    description: {
      story: bestPracticesMd,
    },
    canvas: {
      sourceState: 'hidden',
    },
  },
  previewTabs: {
    'storybook/docs/panel': { hidden: true },
  },
  viewMode: 'docs',
};
