import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardPlainCardExample } from './examples/HoverCard.PlainCard.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { HoverCardInstantDismissExample } from './examples/HoverCard.InstantDismiss.Example';
import { HoverCardEventListenerTargetExample } from './examples/HoverCard.EventListenerTarget.Example';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;
const HoverCardPlainCardExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.PlainCard.Example.tsx') as string;
const HoverCardInstantDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.InstantDismiss.Example.tsx') as string;
const HoverCardEventListenerTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.EventListenerTarget.Example.tsx') as string;

export const HoverCardPageProps: IDocPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/HoverCard',
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
      title: 'Example 3: Plain HoverCard wrapping an element',
      code: HoverCardPlainCardExampleCode,
      view: <HoverCardPlainCardExample />
    },
    {
      title: 'Example 4: Plain HoverCard with instant dismiss from within the card button click',
      code: HoverCardInstantDismissExampleCode,
      view: <HoverCardInstantDismissExample />
    },
    {
      title: 'Example 5: HoverCard using eventListenerTarget to trigger card open',
      code: HoverCardEventListenerTargetExampleCode,
      view: <HoverCardEventListenerTargetExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
