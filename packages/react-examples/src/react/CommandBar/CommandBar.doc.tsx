import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { CommandBarBasicExample } from './CommandBar.Basic.Example';
import { CommandBarButtonAsExample } from './CommandBar.ButtonAs.Example';
import { IndividualCommandBarButtonAsExampleWrapper } from './CommandBar.CommandBarButtonAs.Example';
import { CommandBarSplitDisabledExample } from './CommandBar.SplitDisabled.Example';
import { CommandBarLazyExample } from './CommandBar.Lazy.Example';

const CommandBarBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/CommandBar.Basic.Example.tsx') as string;

const CommandBarButtonAsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/CommandBar.ButtonAs.Example.tsx') as string;

const IndividualCommandBarButtonAsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/CommandBar.CommandBarButtonAs.Example.tsx') as string;

const CommandBarSplitDisabledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/CommandBar.SplitDisabled.Example.tsx') as string;

const CommandBarLazyExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/CommandBar.Lazy.Example.tsx') as string;

export const CommandBarPageProps: IDocPageProps = {
  title: 'CommandBar',
  componentName: 'CommandBar',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/CommandBar',
  examples: [
    {
      title: 'CommandBar with overflowing menu items',
      code: CommandBarBasicExampleCode,
      view: <CommandBarBasicExample />,
    },
    {
      title: 'CommandBar custom buttons and overflow menu',
      code: CommandBarButtonAsExampleCode,
      view: <CommandBarButtonAsExample />,
    },
    {
      title: 'CommandBar with coachmark on individual button',
      code: IndividualCommandBarButtonAsExampleCode,
      view: <IndividualCommandBarButtonAsExampleWrapper />,
    },
    {
      title: 'CommandBar with split and disabled buttons',
      code: CommandBarSplitDisabledExampleCode,
      view: <CommandBarSplitDisabledExample />,
    },
    {
      title: 'CommandBar with lazy-loading menus',
      code: CommandBarLazyExampleCode,
      view: <CommandBarLazyExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/docs/CommandBarOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/docs/CommandBarBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/docs/CommandBarDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/CommandBar/docs/CommandBarDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
