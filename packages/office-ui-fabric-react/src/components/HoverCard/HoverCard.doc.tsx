import * as React from 'react';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { HoverCardStatus } from './HoverCard.checklist';

import './HoverCardPage.global.scss';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;

export const HoverCardPageProps: IDocPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/HoverCard',
  componentStatus: HoverCardStatus,
  examples: [
    {
      title: 'Example 1: HoverCard wrapping an element',
      code: HoverCardBasicExampleCode,
      view: <HoverCardBasicExample />
    },
    {
      title: 'Example 2: HoverCard using Target, DirectionalHint and custom HotKey',
      code: HoverCardTargetExampleCode,
      view: <HoverCardTargetExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardOverview.md'),
  bestPractices: 'Use this guidance when need to fine tune properties of HoverCard',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
