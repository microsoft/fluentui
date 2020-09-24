import * as React from 'react';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { SpinnerBasicExample } from './Spinner.Basic.Example';
import { SpinnerLabeledExample } from './Spinner.Labeled.Example';

const SpinnerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/Spinner.Basic.Example.tsx') as string;
const SpinnerLabeledExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/Spinner.Labeled.Example.tsx') as string;

export const SpinnerPageProps: IDocPageProps = {
  title: 'Spinner',
  componentName: 'Spinner',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Spinner',
  examples: [
    {
      title: 'Spinner sizes',
      code: SpinnerBasicExampleCode,
      view: <SpinnerBasicExample />,
    },
    {
      title: 'Spinner label positioning',
      code: SpinnerLabeledExampleCode,
      view: <SpinnerLabeledExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/docs/SpinnerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/docs/SpinnerBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/docs/SpinnerDos.md'),
  donts: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Spinner/docs/SpinnerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
