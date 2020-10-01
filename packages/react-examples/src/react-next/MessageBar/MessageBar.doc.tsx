import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

import { MessageBarBasicExample } from './MessageBar.Basic.Example';

const MessageBarBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/MessageBar/MessageBar.Basic.Example.tsx') as string;

export const MessageBarPageProps: IDocPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/packages/react-next/src/components/MessageBar',
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/MessageBar/docs/MessageBarBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
