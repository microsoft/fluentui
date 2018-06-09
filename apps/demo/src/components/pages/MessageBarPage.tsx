import * as React from 'react';
import { MessageBarBasicExample } from 'office-ui-fabric-react/lib/components/MessageBar/examples/MessageBar.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { MessageBarStatus } from 'office-ui-fabric-react/lib/components/MessageBar/MessageBar.checklist';

const MessageBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;

export const MessageBarPageProps: IDemoPageProps = {
  title: 'MessageBar',
  componentName: 'MessageBar',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MessageBar',
  componentStatus: MessageBarStatus,
  examples: [
    {
      title: 'Various MessageBar types',
      code: MessageBarBasicExampleCode,
      view: <MessageBarBasicExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/MessageBar.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDonts.md'),
  isHeaderVisible: true
};

export const MessageBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...MessageBarPageProps, ...props }} />
);
