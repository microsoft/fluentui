import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';

const MessageBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;

export const MessageBarPageProps: IDocPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MessageBar',
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
