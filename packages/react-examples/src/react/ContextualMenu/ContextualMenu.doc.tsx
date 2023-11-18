import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { ContextualMenuBasicExample } from './ContextualMenu.Basic.Example';
import { ContextualMenuDefaultExample } from './ContextualMenu.Default.Example';
import { ContextualMenuIconExample } from './ContextualMenu.Icon.Example';
import { ContextualMenuIconSecondaryTextExample } from './ContextualMenu.Icon.SecondaryText.Example';
import { ContextualMenuSubmenuExample } from './ContextualMenu.Submenu.Example';
import { ContextualMenuSectionExample } from './ContextualMenu.Section.Example';
import { ContextualMenuCheckmarksExample } from './ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './ContextualMenu.Customization.Example';
import { ContextualMenuCustomizationWithNoWrapExample } from './ContextualMenu.CustomizationWithNoWrap.Example';
import { ContextualMenuWithScrollBarExample } from './ContextualMenu.ScrollBar.Example';
import { ContextualMenuWithCustomMenuItemExample } from './ContextualMenu.CustomMenuItem.Example';
import { ContextualMenuWithCustomMenuListExample } from './ContextualMenu.CustomMenuList.Example';
import { ContextualMenuHeaderExample } from './ContextualMenu.Header.Example';
import { ContextualMenuPersistedExample } from './ContextualMenu.Persisted.Example';
import { ContextualMenuScreenReaderExample } from './ContextualMenu.ScreenReader.Example';

const ContextualMenuBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Basic.Example.tsx') as string;
const ContextualMenuDefaultExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Default.Example.tsx') as string;
const ContextualMenuPersistedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Persisted.Example.tsx') as string;
const ContextualMenuIconExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Icon.Example.tsx') as string;
const ContextualMenuIconSecondaryTextExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Icon.SecondaryText.Example.tsx') as string;
const ContextualMenuSubmenuExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Submenu.Example.tsx') as string;
const ContextualMenuSectionExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Section.Example.tsx') as string;
const ContextualMenuCheckmarksExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Checkmarks.Example.tsx') as string;
const ContextualMenuDirectionalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Directional.Example.tsx') as string;
const ContextualMenuCustomizationExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Customization.Example.tsx') as string;
const ContextualMenuCustomizationWithNoWrapExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.CustomizationWithNoWrap.Example.tsx') as string;
const ContextualMenuWithScrollBarExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.ScrollBar.Example.tsx') as string;
const ContextualMenuWithCustomMenuItemExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.CustomMenuItem.Example.tsx') as string;
const ContextualMenuCustomMenuListExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.CustomMenuList.Example.tsx') as string;
const ContextualMenuHeaderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.Header.Example.tsx') as string;
const ContextualMenuScreenReaderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/ContextualMenu.ScreenReader.Example.tsx') as string;

export const ContextualMenuPageProps: IDocPageProps = {
  title: 'ContextualMenu',
  componentName: 'ContextualMenu',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/ContextualMenu',
  examples: [
    {
      title: 'Basic ContextualMenu',
      code: ContextualMenuBasicExampleCode,
      view: <ContextualMenuBasicExample />,
    },
    {
      title: 'Default ContextualMenu',
      code: ContextualMenuDefaultExampleCode,
      view: <ContextualMenuDefaultExample />,
    },
    {
      title: 'ContextualMenu which is persisted in the DOM',
      code: ContextualMenuPersistedExampleCode,
      view: <ContextualMenuPersistedExample />,
    },
    {
      title: 'ContextualMenu with icons',
      code: ContextualMenuIconExampleCode,
      view: <ContextualMenuIconExample />,
    },
    {
      title: 'ContextualMenu with icons and secondary text',
      code: ContextualMenuIconSecondaryTextExampleCode,
      view: <ContextualMenuIconSecondaryTextExample />,
    },
    {
      title: 'ContextualMenu with submenus',
      code: ContextualMenuSubmenuExampleCode,
      view: <ContextualMenuSubmenuExample />,
    },
    {
      title: 'ContextualMenu with section headers',
      code: ContextualMenuSectionExampleCode,
      view: <ContextualMenuSectionExample />,
    },
    {
      title: 'ContextualMenu with checkable menu items and toggleable split button',
      code: ContextualMenuCheckmarksExampleCode,
      view: <ContextualMenuCheckmarksExample />,
    },
    {
      title: 'ContextualMenu with beak and directional settings',
      code: ContextualMenuDirectionalExampleCode,
      view: <ContextualMenuDirectionalExample />,
    },
    {
      title: 'ContextualMenu with customized submenus',
      code: ContextualMenuCustomizationExampleCode,
      view: <ContextualMenuCustomizationExample />,
    },
    {
      title: 'ContextualMenu with customized submenus and noWrap attributes',
      code: ContextualMenuCustomizationWithNoWrapExampleCode,
      view: <ContextualMenuCustomizationWithNoWrapExample />,
    },
    {
      title: 'ContextualMenu with a scroll bar and fixed direction',
      code: ContextualMenuWithScrollBarExampleCode,
      view: <ContextualMenuWithScrollBarExample />,
    },
    {
      title: 'ContextualMenu with custom rendered menu items',
      code: ContextualMenuWithCustomMenuItemExampleCode,
      view: <ContextualMenuWithCustomMenuItemExample />,
    },
    {
      title: 'ContextualMenu with custom rendered menu list that renders a search box to filter menu items',
      code: ContextualMenuCustomMenuListExampleCode,
      view: <ContextualMenuWithCustomMenuListExample />,
    },
    {
      title: 'ContextualMenu with header',
      code: ContextualMenuHeaderExampleCode,
      view: <ContextualMenuHeaderExample />,
    },
    {
      title: 'ContextualMenu with additional screen reader text',
      code: ContextualMenuScreenReaderExampleCode,
      view: <ContextualMenuScreenReaderExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/docs/ContextualMenuOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ContextualMenu/docs/ContextualMenuBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
