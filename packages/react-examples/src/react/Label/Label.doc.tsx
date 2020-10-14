import * as React from 'react';
import { LabelBasicExample } from './Label.Basic.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

const LabelBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/Label/Label.Basic.Example.tsx') as string;

export const LabelPageProps: IDocPageProps = {
  title: 'Label',
  componentName: 'Label',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-internal/src/components/Label',
  examples: [
    {
      title: 'Label',
      code: LabelBasicExampleCode,
      view: <LabelBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react/Label/docs/LabelOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-examples/src/react/Label/docs/LabelBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
