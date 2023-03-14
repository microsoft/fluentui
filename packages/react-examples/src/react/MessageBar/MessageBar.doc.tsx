import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { MessageBarBasicExample } from './MessageBar.Basic.Example';
import { MessageBarNoDelayExample } from './MessageBar.NoDelay.Example';

const MessageBarBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/MessageBar/MessageBar.Basic.Example.tsx') as string;
const MessageBarNoDelayExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/MessageBar/MessageBar.NoDelay.Example.tsx') as string;

export const MessageBarPageProps: IDocPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/MessageBar',
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />,
    },
    {
      title: 'MessageBar without delayed rendering',
      code: MessageBarNoDelayExampleCode,
      view: <MessageBarNoDelayExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/MessageBar/docs/MessageBarBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
