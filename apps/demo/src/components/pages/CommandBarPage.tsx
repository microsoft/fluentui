import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { CommandBarStatus } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.checklist';
import { ICommandBarProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types';
import { CommandBarBasicExample } from 'office-ui-fabric-react/lib/components/CommandBar/examples/CommandBar.Basic.Example';
import { CommandBarButtonAsExample } from 'office-ui-fabric-react/lib/components/CommandBar/examples/CommandBar.ButtonAs.Example';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

const CommandBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx') as string;

const CommandBarButtonAsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.ButtonAs.Example.tsx') as string;

const cmdBarParamsTextAndIcons: ICommandBarProps = {
  items,
  overflowItems,
  farItems
};

export const CommandBarPageProps: IDemoPageProps = {
  title: 'CommandBar',
  componentName: 'CommandBar',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/CommandBar',
  componentStatus: CommandBarStatus,
  examples: [
    {
      title: 'CommandBar with overflowing menu items',
      code: CommandBarBasicExampleCode,
      view: <CommandBarBasicExample {...cmdBarParamsTextAndIcons} />
    },
    {
      title: 'CommandBar custom buttons',
      code: CommandBarButtonAsExampleCode,
      view: <CommandBarButtonAsExample {...cmdBarParamsTextAndIcons} />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/CommandBar.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDonts.md'),
  isHeaderVisible: true
};

export const CommandBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...CommandBarPageProps, ...props }} />
);
