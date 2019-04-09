import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';
import { MessageBarStyledExample } from './examples/MessageBar.Styled.Example';
import { MessageBarStatus } from './MessageBar.checklist';

const MessageBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;
const MessageBarBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;
const MessageBarStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Styled.Example.tsx') as string;
const MessageBarStyledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Styled.Example.tsx') as string;

export const MessageBarPageProps: IDocPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MessageBar',
  componentStatus: MessageBarStatus,
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />,
      codepenJS: MessageBarBasicExampleCodepen
    },
    {
      title: 'Custom styled MessageBars',
      code: MessageBarStyledExampleCode,
      view: <MessageBarStyledExample />,
      codepenJS: MessageBarStyledExampleCodepen
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/MessageBar.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
