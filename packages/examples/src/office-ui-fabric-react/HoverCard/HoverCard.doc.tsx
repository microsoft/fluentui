import * as React from 'react';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardPlainCardExample } from './examples/HoverCard.PlainCard.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { HoverCardInstantDismissExample } from './examples/HoverCard.InstantDismiss.Example';
import { HoverCardEventListenerTargetExample } from './examples/HoverCard.EventListenerTarget.Example';

const HoverCardBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/examples/HoverCard.Target.Example.tsx') as string;
const HoverCardPlainCardExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/examples/HoverCard.PlainCard.Example.tsx') as string;
const HoverCardInstantDismissExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/examples/HoverCard.InstantDismiss.Example.tsx') as string;
const HoverCardEventListenerTargetExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/examples/HoverCard.EventListenerTarget.Example.tsx') as string;

export const HoverCardPageProps: IDocPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/HoverCard',
  examples: [
    {
      title: 'Expanding HoverCard wrapping an element',
      code: HoverCardBasicExampleCode,
      view: <HoverCardBasicExample />,
    },
    {
      title: 'Expanding HoverCard using target, DirectionalHint and custom hotkey',
      code: HoverCardTargetExampleCode,
      view: <HoverCardTargetExample />,
    },
    {
      title: 'Plain HoverCard wrapping an element',
      code: HoverCardPlainCardExampleCode,
      view: <HoverCardPlainCardExample />,
    },
    {
      title: 'Plain HoverCard with instant dismiss from within the card button click',
      code: HoverCardInstantDismissExampleCode,
      view: <HoverCardInstantDismissExample />,
    },
    {
      title: 'HoverCard using eventListenerTarget to trigger card open',
      code: HoverCardEventListenerTargetExampleCode,
      view: <HoverCardEventListenerTargetExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/docs/HoverCardOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/docs/HoverCardBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/docs/HoverCardDos.md'),
  donts: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/HoverCard/docs/HoverCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
