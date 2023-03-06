import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { SpinnerBasicExample } from './Spinner.Basic.Example';
import { SpinnerLabeledExample } from './Spinner.Labeled.Example';

const SpinnerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/Spinner.Basic.Example.tsx') as string;
const SpinnerLabeledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/Spinner.Labeled.Example.tsx') as string;

export const SpinnerPageProps: IDocPageProps = {
  title: 'Spinner',
  componentName: 'Spinner',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Spinner',
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
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/docs/SpinnerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/docs/SpinnerBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/docs/SpinnerDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Spinner/docs/SpinnerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
