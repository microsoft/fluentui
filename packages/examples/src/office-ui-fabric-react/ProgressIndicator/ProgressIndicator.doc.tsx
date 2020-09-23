import * as React from 'react';
import { ProgressIndicatorBasicExample } from './ProgressIndicator.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { ProgressIndicatorIndeterminateExample } from './ProgressIndicator.Indeterminate.Example';

const ProgressIndicatorBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/ProgressIndicator.Basic.Example.tsx') as string;
const ProgressIndicatorIndeterminateExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/ProgressIndicator.Indeterminate.Example.tsx') as string;

export const ProgressIndicatorPageProps: IDocPageProps = {
  title: 'ProgressIndicator',
  componentName: 'ProgressIndicator',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ProgressIndicator',
  examples: [
    {
      title: 'Default ProgressIndicator',
      code: ProgressIndicatorBasicExampleCode,
      view: <ProgressIndicatorBasicExample />,
    },
    {
      title: 'Indeterminate ProgressIndicator',
      code: ProgressIndicatorIndeterminateExampleCode,
      view: <ProgressIndicatorIndeterminateExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/docs/ProgressIndicatorOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/docs/ProgressIndicatorBestPractices.md'),
  dos: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/docs/ProgressIndicatorDos.md'),
  donts: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ProgressIndicator/docs/ProgressIndicatorDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
