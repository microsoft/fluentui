import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

import { SpinButtonBasicExample } from './SpinButton.Basic.Example';
import { SpinButtonCustomStyledExample } from './SpinButton.CustomStyled.Example';
import { SpinButtonIconExample } from './SpinButton.Icon.Example';
import { SpinButtonSuffixExample } from './SpinButton.Suffix.Example';
import { SpinButtonTopPositionExample } from './SpinButton.TopPosition.Example';

const SpinButtonBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SpinButton/SpinButton.Basic.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SpinButton/SpinButton.CustomStyled.Example.tsx') as string;
const SpinButtonIconExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SpinButton/SpinButton.Icon.Example.tsx') as string;
const SpinButtonSuffixExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SpinButton/SpinButton.Suffix.Example.tsx') as string;
const SpinButtonTopPositionExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SpinButton/SpinButton.TopPosition.Example.tsx') as string;

export const SpinButtonPageProps: IDocPageProps = {
  title: 'SpinButton',
  componentName: 'SpinButton',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-internal/src/components/SpinButton',
  examples: [
    {
      title: 'Basic SpinButton',
      code: SpinButtonBasicExampleCode,
      view: <SpinButtonBasicExample />,
    },
    {
      title: 'SpinButton with icon',
      code: SpinButtonIconExampleCode,
      view: <SpinButtonIconExample />,
    },
    {
      title: 'SpinButton with label above',
      code: SpinButtonTopPositionExampleCode,
      view: <SpinButtonTopPositionExample />,
    },
    {
      title: 'SpinButton with suffix',
      code: SpinButtonSuffixExampleCode,
      view: <SpinButtonSuffixExample />,
    },
    {
      title: 'Custom styled SpinButton',
      code: SpinButtonCustomStyledExampleCode,
      view: <SpinButtonCustomStyledExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react/SpinButton/docs/SpinButtonOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react/SpinButton/docs/SpinButtonBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
