import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { HoverCardStatus } from './HoverCard.checklist';

import './HoverCardPage.scss';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;

export const HoverCardPageProps: IDemoPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/HoverCard',
  componentStatus: HoverCardStatus,
  examples: [
    {
      title: 'HoverCard',
      code: HoverCardBasicExampleCode,
      view: <HoverCardBasicExample />
    },
    {
      title: 'HoverCard using Target and at right center',
      code: HoverCardTargetExampleCode,
      view: <HoverCardTargetExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardOverview.md'),
  isHeaderVisible: true,
  allowNativeProps: true
};

export const HoverCardPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage {...{ ...HoverCardPageProps, ...props }} />
  </LayerHost>
);
