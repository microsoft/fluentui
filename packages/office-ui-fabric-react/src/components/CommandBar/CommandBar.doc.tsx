import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { CommandBarStatus } from './CommandBar.checklist';
import { ICommandBarProps } from './CommandBar.types';
import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarButtonAsExample } from './examples/CommandBar.ButtonAs.Example';
import { IndividualCommandBarButtonAsExampleWrapper } from './examples/CommandBar.CommandBarButtonAs.Example';
import { farItems, items, overflowItems } from './examples/data';

const CommandBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx') as string;

const CommandBarButtonAsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.ButtonAs.Example.tsx') as string;

const IndividualCommandBarButtonAsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.CommandBarButtonAs.Example.tsx') as string;

const cmdBarParamsTextAndIcons: ICommandBarProps = {
  items,
  overflowItems,
  farItems
};

export const CommandBarPageProps: IDocPageProps = {
  title: 'CommandBar',
  componentName: 'CommandBar',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/CommandBar',
  componentStatus: CommandBarStatus,
  examples: [
    {
      title: 'CommandBar with overflowing menu items',
      code: CommandBarBasicExampleCode,
      view: <CommandBarBasicExample {...cmdBarParamsTextAndIcons} />
    },
    {
      title: 'CommandBar custom buttons and overflow menu',
      code: CommandBarButtonAsExampleCode,
      view: <CommandBarButtonAsExample {...cmdBarParamsTextAndIcons} />
    },
    {
      title: 'CommandBar with coachmark on individual button',
      code: IndividualCommandBarButtonAsExampleCode,
      view: <IndividualCommandBarButtonAsExampleWrapper {...cmdBarParamsTextAndIcons} />
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
  isHeaderVisible: true,
  isFeedbackVisible: true
};
