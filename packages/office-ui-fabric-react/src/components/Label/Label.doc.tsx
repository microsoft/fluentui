import * as React from 'react';
import { LabelBasicExample } from './examples/Label.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const LabelBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Label/examples/Label.Basic.Example.tsx') as string;

export const LabelPageProps: IDocPageProps = {
  title: 'Label',
  componentName: 'Label',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Label',
  examples: [
    {
      title: 'Label',
      code: LabelBasicExampleCode,
      view: <LabelBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelOverview.md'),
  bestPractices: require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
