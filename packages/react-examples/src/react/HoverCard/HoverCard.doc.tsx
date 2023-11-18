import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { HoverCardBasicExample } from './HoverCard.Basic.Example';
import { HoverCardPlainCardExample } from './HoverCard.PlainCard.Example';
import { HoverCardTargetExample } from './HoverCard.Target.Example';
import { HoverCardInstantDismissExample } from './HoverCard.InstantDismiss.Example';
import { HoverCardEventListenerTargetExample } from './HoverCard.EventListenerTarget.Example';

const HoverCardBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/HoverCard.Target.Example.tsx') as string;
const HoverCardPlainCardExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/HoverCard.PlainCard.Example.tsx') as string;
const HoverCardInstantDismissExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/HoverCard.InstantDismiss.Example.tsx') as string;
const HoverCardEventListenerTargetExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/HoverCard.EventListenerTarget.Example.tsx') as string;

export const HoverCardPageProps: IDocPageProps = {
  title: 'HoverCard',
  componentName: 'HoverCard',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/HoverCard',
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
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/docs/HoverCardOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/docs/HoverCardBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/docs/HoverCardDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/HoverCard/docs/HoverCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
