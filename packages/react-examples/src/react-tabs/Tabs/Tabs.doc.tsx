import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';
import { TabsBasicExample } from './Tabs.Basic.Example';
import { TabsIconCountExample } from './Tabs.IconCount.Example';
import { TabsLargeExample } from './Tabs.Large.Example';
import { TabsTabsExample } from './Tabs.Tabs.Example';
import { TabsTabsLargeExample } from './Tabs.TabsLarge.Example';
import { TabsOnChangeExample } from './Tabs.OnChange.Example';
import { TabsRemoveExample } from './Tabs.Remove.Example';
import { TabsOverrideExample } from './Tabs.Override.Example';
import { TabsSeparateExample } from './Tabs.Separate.Example';
import { TabsOverflowMenuExample } from './Tabs.OverflowMenu.Example';

const TabsRemoveExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Remove.Example.tsx') as string;
const TabsBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Basic.Example.tsx') as string;
const TabsLargeExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Large.Example.tsx') as string;
const TabsTabsExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Tabs.Example.tsx') as string;
const TabsTabsLargeExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.TabsLarge.Example.tsx') as string;
const TabsOnChangeExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.OnChange.Example.tsx') as string;
const TabsIconCountExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.IconCount.Example.tsx') as string;
const TabsOverrideExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Override.Example.tsx') as string;
const TabsSeparateExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.Separate.Example.tsx') as string;
const TabsOverflowMenuExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/Tabs.OverflowMenu.Example.tsx') as string;

export const TabsPageProps: IDocPageProps = {
  title: 'Tabs',
  componentName: 'Tabs',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Tabs',
  examples: [
    {
      title: 'Default Tabs',
      code: TabsBasicExampleCode,
      view: <TabsBasicExample />,
    },
    {
      title: 'Count and Icon',
      code: TabsIconCountExampleCode,
      view: <TabsIconCountExample />,
    },
    {
      title: 'Large tab size',
      code: TabsLargeExampleCode,
      view: <TabsLargeExample />,
    },
    {
      title: 'Tabs of tab style',
      code: TabsTabsExampleCode,
      view: <TabsTabsExample />,
    },
    {
      title: 'Tabs of large tab style',
      code: TabsTabsLargeExampleCode,
      view: <TabsTabsLargeExample />,
    },
    {
      title: 'Trigger onchange event',
      code: TabsOnChangeExampleCode,
      view: <TabsOnChangeExample />,
    },
    {
      title: 'Show/Hide tab item',
      code: TabsRemoveExampleCode,
      view: <TabsRemoveExample />,
    },
    {
      title: 'Override selected item',
      code: TabsOverrideExampleCode,
      view: <TabsOverrideExample />,
    },
    {
      title: 'Render content separately',
      code: TabsSeparateExampleCode,
      view: <TabsSeparateExample />,
    },
    {
      title: 'Tabs with overflow menu',
      code: TabsOverflowMenuExampleCode,
      view: <TabsOverflowMenuExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/docs/TabsOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/docs/TabsBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/docs/TabsDos.md'),
  donts: require<string>('!raw-loader!@fluentui/react-examples/src/react-tabs/Tabs/docs/TabsDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativePropsForComponentName: 'TabItem',
  allowNativeProps: true,
};
