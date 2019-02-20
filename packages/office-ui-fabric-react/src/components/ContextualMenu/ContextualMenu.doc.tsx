import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { ContextualMenuStatus } from './ContextualMenu.checklist';

import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuIconExample } from './examples/ContextualMenu.Icon.Example';
import { ContextualMenuIconSecondaryTextExample } from './examples/ContextualMenu.Icon.SecondaryText.Example';
import { ContextualMenuSubmenuExample } from './examples/ContextualMenu.Submenu.Example';
import { ContextualMenuSectionExample } from './examples/ContextualMenu.Section.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';
import { ContextualMenuCustomizationWithNoWrapExample } from './examples/ContextualMenu.CustomizationWithNoWrap.Example';
import { ContextualMenuWithScrollBarExample } from './examples/ContextualMenu.ScrollBar.Example';
import { ContextualMenuWithCustomMenuItemExample } from './examples/ContextualMenu.CustomMenuItem.Example';
import { ContextualMenuWithCustomMenuListExample } from './examples/ContextualMenu.CustomMenuList.Example';
import { ContextualMenuHeaderExample } from './examples/ContextualMenu.Header.Example';
import { ContextualMenuPersistedExample } from './examples/ContextualMenu.Persisted.Example';

const ContextualMenuBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Basic.Example.tsx') as string;
const ContextualMenuPersistedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Persisted.Example.tsx') as string;
const ContextualMenuBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ContextualMenu/ContextualMenu.Basic.Example.Codepen.txt') as string;
const ContextualMenuIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.Example.tsx') as string;
const ContextualMenuIconSecondaryTextExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.SecondaryText.Example.tsx') as string;
const ContextualMenuSubmenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Submenu.Example.tsx') as string;
const ContextualMenuSectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Section.Example.tsx') as string;
const ContextualMenuCheckmarksExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Checkmarks.Example.tsx') as string;
const ContextualMenuDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Directional.Example.tsx') as string;
const ContextualMenuCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Customization.Example.tsx') as string;
const ContextualMenuCustomizationWithNoWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomizationWithNoWrap.Example.tsx') as string;
const ContextualMenuWithScrollBarExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.ScrollBar.Example.tsx') as string;
const ContextualMenuWithCustomMenuItemExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuItem.Example.tsx') as string;
const ContextualMenuCustomMenuListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuList.Example.tsx') as string;
const ContextualMenuHeaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Header.Example.tsx') as string;

export const ContextualMenuPageProps: IDocPageProps = {
  title: 'ContextualMenu',
  componentName: 'ContextualMenu',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ContextualMenu',
  componentStatus: ContextualMenuStatus,
  examples: [
    {
      title: 'Default ContextualMenu',
      code: ContextualMenuBasicExampleCode,
      view: <ContextualMenuBasicExample />,
      codepenJS: ContextualMenuBasicExampleCodepen
    },
    {
      title: 'ContextualMenu which is persisted in the DOM',
      code: ContextualMenuPersistedExampleCode,
      view: <ContextualMenuPersistedExample />
    },
    {
      title: 'ContextualMenu with icons',
      code: ContextualMenuIconExampleCode,
      view: <ContextualMenuIconExample />
    },
    {
      title: 'ContextualMenu with icons and secondary text',
      code: ContextualMenuIconSecondaryTextExampleCode,
      view: <ContextualMenuIconSecondaryTextExample />
    },
    {
      title: 'ContextualMenu with submenus',
      code: ContextualMenuSubmenuExampleCode,
      view: <ContextualMenuSubmenuExample />
    },
    {
      title: 'ContextualMenu with section headers',
      code: ContextualMenuSectionExampleCode,
      view: <ContextualMenuSectionExample />
    },
    {
      title: 'ContextualMenu with checkable menu items and toggleable split button',
      code: ContextualMenuCheckmarksExampleCode,
      view: <ContextualMenuCheckmarksExample />
    },
    {
      title: 'ContextualMenu with beak and directional settings',
      code: ContextualMenuDirectionalExampleCode,
      view: <ContextualMenuDirectionalExample />
    },
    {
      title: 'ContextualMenu with customized submenus',
      code: ContextualMenuCustomizationExampleCode,
      view: <ContextualMenuCustomizationExample />
    },
    {
      title: 'ContextualMenu with customized submenus and noWrap attributes',
      code: ContextualMenuCustomizationWithNoWrapExampleCode,
      view: <ContextualMenuCustomizationWithNoWrapExample />
    },
    {
      title: 'ContextualMenu with a scroll bar and fixed direction',
      code: ContextualMenuWithScrollBarExampleCode,
      view: <ContextualMenuWithScrollBarExample />
    },
    {
      title: 'ContextualMenu with custom rendered menu items',
      code: ContextualMenuWithCustomMenuItemExampleCode,
      view: <ContextualMenuWithCustomMenuItemExample />
    },
    {
      title: 'ContextualMenu with custom rendered menu list that renders a search box to filter menu items',
      code: ContextualMenuCustomMenuListExampleCode,
      view: <ContextualMenuWithCustomMenuListExample />
    },
    {
      title: 'ContextualMenu with header',
      code: ContextualMenuHeaderExampleCode,
      view: <ContextualMenuHeaderExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
