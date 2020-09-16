import * as React from 'react';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';

const VerticalDividerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/examples/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/examples/VerticalDivider.Custom.Example.tsx') as string;

export const DividerPageProps: IDocPageProps = {
  title: 'Divider',
  componentName: 'Divider',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Divider',
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
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/docs/DividerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/docs/DividerBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/docs/DividerDos.md'),
  donts: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Divider/docs/DividerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
