import * as React from 'react';
import { SeparatorBasicExample } from './Separator.Basic.Example';
import { SeparatorThemingExample } from './Separator.Theming.Example';
import { SeparatorIconExample } from './Separator.Icon.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const SeparatorBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/Separator.Basic.Example.tsx') as string;

const SeparatorThemingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/Separator.Theming.Example.tsx') as string;

const SeparatorIconExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/Separator.Icon.Example.tsx') as string;

export const SeparatorPageProps: IDocPageProps = {
  title: 'Separator',
  componentName: 'Separator',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Separator',
  examples: [
    {
      title: 'Basic Separator with Text',
      code: SeparatorBasicExampleCode,
      view: <SeparatorBasicExample />,
    },
    {
      title: 'Basic Themed Separator with Text',
      code: SeparatorThemingExampleCode,
      view: <SeparatorThemingExample />,
    },
    {
      title: 'Separator With Icon',
      code: SeparatorIconExampleCode,
      view: <SeparatorIconExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/docs/SeparatorOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/docs/SeparatorBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/docs/SeparatorDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Separator/docs/SeparatorDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
