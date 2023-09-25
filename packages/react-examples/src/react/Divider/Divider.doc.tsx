import * as React from 'react';
import { VerticalDividerBasicExample } from './VerticalDivider.Basic.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { VerticalDividerCustomExample } from './VerticalDivider.Custom.Example';

const VerticalDividerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/VerticalDivider.Custom.Example.tsx') as string;

export const DividerPageProps: IDocPageProps = {
  title: 'Divider',
  componentName: 'Divider',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Divider',
  examples: [
    {
      title: 'Vertical Divider',
      code: VerticalDividerBasicExampleCode,
      view: <VerticalDividerBasicExample />,
    },
    {
      title: 'Custom Vertical Divider',
      code: VerticalDividerCustomExampleCode,
      view: <VerticalDividerCustomExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/docs/DividerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/docs/DividerBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/docs/DividerDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Divider/docs/DividerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
