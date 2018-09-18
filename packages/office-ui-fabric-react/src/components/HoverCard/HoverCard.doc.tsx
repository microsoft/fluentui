import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardBasicCardExample } from './examples/HoverCard.BasicCard.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { HoverCardStatus } from './HoverCard.checklist';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;
const HoverCardBasicCardExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.BasicCard.Example.tsx') as string;

export const HoverCardPageProps: IDocPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/HoverCard',
  componentStatus: HoverCardStatus,
  examples: [
    {
      title: 'Example 1: Expanding HoverCard wrapping an element',
      code: HoverCardBasicExampleCode,
      view: <HoverCardBasicExample />
    },
    {
      title: 'Example 2: Expanding HoverCard using Target, DirectionalHint and custom HotKey',
      code: HoverCardTargetExampleCode,
      view: <HoverCardTargetExample />
    },
    {
      title: 'Example 3: Basic HoverCard wrapping an element',
      code: HoverCardBasicCardExampleCode,
      view: <HoverCardBasicCardExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/Card.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/BasicCard/BasicCard.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard/ExpandingCard.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
