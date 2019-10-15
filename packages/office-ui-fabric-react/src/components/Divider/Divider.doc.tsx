import * as React from 'react';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';

const VerticalDividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Custom.Example.tsx') as string;

export const DividerPageProps: IDocPageProps = {
  title: 'Divider',
  componentName: 'Divider',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Divider',
  examples: [
    {
      title: 'Vertical Divider',
      code: VerticalDividerBasicExampleCode,
      view: <VerticalDividerBasicExample />
    },
    {
      title: 'Custom Vertical Divider',
      code: VerticalDividerCustomExampleCode,
      view: <VerticalDividerCustomExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerOverview.md'),
  bestPractices: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerBestPractices.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
