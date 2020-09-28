import * as React from 'react';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

import { MessageBarBasicExample } from './MessageBar.Basic.Example';

const MessageBarBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/MessageBar/MessageBar.Basic.Example.tsx') as string;

export const MessageBarPageProps: IDocPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/MessageBar',
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/MessageBar/docs/MessageBarBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
