import * as React from 'react';
import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ProgressIndicatorIndeterminateExample } from './examples/ProgressIndicator.Indeterminate.Example';

const ProgressIndicatorBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Basic.Example.tsx') as string;
const ProgressIndicatorIndeterminateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Indeterminate.Example.tsx') as string;

export const ProgressIndicatorPageProps: IDocPageProps = {
  title: 'ProgressIndicator',
  componentName: 'ProgressIndicator',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ProgressIndicator',
  examples: [
    {
      title: 'Default ProgressIndicator',
      code: ProgressIndicatorBasicExampleCode,
      view: <ProgressIndicatorBasicExample />
    },
    {
      title: 'Indeterminate ProgressIndicator',
      code: ProgressIndicatorIndeterminateExampleCode,
      view: <ProgressIndicatorIndeterminateExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
