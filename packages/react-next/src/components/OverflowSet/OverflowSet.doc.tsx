import * as React from 'react';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';
import { OverflowSetBasicReversedExample } from './examples/OverflowSet.BasicReversed.Example';

const OverflowSetCustomExampleCode = require('!raw-loader!@fluentui/react-next/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetBasicExampleCode = require('!raw-loader!@fluentui/react-next/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetVerticalExampleCode = require('!raw-loader!@fluentui/react-next/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;
const OverflowSetBasicReversedExampleCode = require('!raw-loader!@fluentui/react-next/src/components/OverflowSet/examples/OverflowSet.BasicReversed.Example.tsx') as string;

export const OverflowSetPageProps: IDocPageProps = {
  title: 'OverflowSet',
  componentName: 'OverflowSet',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/OverflowSet',
  examples: [
    {
      title: 'OverflowSet Basic Example',
      code: OverflowSetBasicExampleCode,
      view: <OverflowSetBasicExample />,
    },
    {
      title: 'OverflowSet Vertical Example',
      code: OverflowSetVerticalExampleCode,
      view: <OverflowSetVerticalExample />,
    },
    {
      title: 'OverflowSet Custom Example',
      code: OverflowSetCustomExampleCode,
      view: <OverflowSetCustomExample />,
    },
    {
      title: 'OverflowSet Reversed Example',
      code: OverflowSetBasicReversedExampleCode,
      view: <OverflowSetBasicReversedExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-next/src/components/OverflowSet/docs/OverflowSetOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-next/src/components/OverflowSet/docs/OverflowSetBestPractices.md'),
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
