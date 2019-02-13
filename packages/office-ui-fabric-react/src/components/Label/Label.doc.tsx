import * as React from 'react';
import { LabelBasicExample } from './examples/Label.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { LabelStatus } from './Label.checklist';

const LabelBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Label/examples/Label.Basic.Example.tsx') as string;

export const LabelPageProps: IDocPageProps = {
  title: 'Label',
  componentName: 'Label',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Label',
  componentStatus: LabelStatus,
  examples: [
    {
      title: 'Label',
      code: LabelBasicExampleCode,
      view: <LabelBasicExample />,
      codepenJS: require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Label/Label.Basic.Example.Codepen.txt') as string
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/Label.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
