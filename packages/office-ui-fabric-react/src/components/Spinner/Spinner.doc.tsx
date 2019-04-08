import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { SpinnerStatus } from './Spinner.checklist';
import { SpinnerBasicExample } from './examples/Spinner.Basic.Example';
import { SpinnerLabeledExample } from './examples/Spinner.Labeled.Example';

const SpinnerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Basic.Example.tsx') as string;
const SpinnerBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Basic.Example.tsx') as string;
const SpinnerLabeledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Labeled.Example.tsx') as string;
const SpinnerLabeledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Labeled.Example.tsx') as string;

export const SpinnerPageProps: IDocPageProps = {
  title: 'Spinner',
  componentName: 'Spinner',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Spinner',
  componentStatus: SpinnerStatus,
  examples: [
    {
      title: 'Spinner sizes',
      code: SpinnerBasicExampleCode,
      view: <SpinnerBasicExample />,
      codepenJS: SpinnerBasicExampleCodepen
    },
    {
      title: 'Spinner label positioning',
      code: SpinnerLabeledExampleCode,
      view: <SpinnerLabeledExample />,
      codepenJS: SpinnerLabeledExampleCodepen
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/Spinner.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
