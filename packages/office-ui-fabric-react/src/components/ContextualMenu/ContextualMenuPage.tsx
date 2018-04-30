import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuIconExample } from './examples/ContextualMenu.Icon.Example';
import { ContextualMenuSectionExample } from './examples/ContextualMenu.Section.Example';
import { ContextualMenuSubmenuExample } from './examples/ContextualMenu.Submenu.Example';
import { ContextualMenuCustomizationWithNoWrapExample } from './examples/ContextualMenu.CustomizationWithNoWrap.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';
import { ContextualMenuWithScrollBarExample } from './examples/ContextualMenu.ScrollBar.Example';
import { ContextualMenuWithCustomMenuItemExample } from './examples/ContextualMenu.CustomMenuItem.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ContextualMenuStatus } from './ContextualMenu.checklist';

const ContextualMenuBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Basic.Example.tsx') as string;
const ContextualMenuIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.Example.tsx') as string;
const ContextualMenuSectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Section.Example.tsx') as string;
const ContextualMenuSubmenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Submenu.Example.tsx') as string;
const ContextualMenuCheckmarksExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Checkmarks.Example.tsx') as string;
const ContextualMenuDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Directional.Example.tsx') as string;
const ContextualMenuCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Customization.Example.tsx') as string;
const ContextualMenuWithScrollBarExampleCode = require
  ('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.ScrollBar.Example.tsx') as string;
const ContextualMenuWithCustomMenuItemExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuItem.Example.tsx') as string;

export class ContextualMenuPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ContextualMenu'
        componentName='ContextualMenuExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ContextualMenu'
        exampleCards={
          <div>
            <ExampleCard
              title='Default ContextualMenu'
              code={ ContextualMenuBasicExampleCode }
            >
              <ContextualMenuBasicExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with icons'
              code={ ContextualMenuIconExampleCode }
            >
              <ContextualMenuIconExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with submenus'
              code={ ContextualMenuSubmenuExampleCode }
            >
              <ContextualMenuSubmenuExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with section headers'
              code={ ContextualMenuSectionExampleCode }
            >
              <ContextualMenuSectionExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with checkable menu items and toggable split button'
              code={ ContextualMenuCheckmarksExampleCode }
            >
              <ContextualMenuCheckmarksExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with beak and directional settings'
              code={ ContextualMenuDirectionalExampleCode }
            >
              <ContextualMenuDirectionalExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with customized submenus'
              code={ ContextualMenuCustomizationExampleCode }
            >
              <ContextualMenuCustomizationExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with customized submenus and noWrap attributes'
              code={ ContextualMenuSubmenuExampleCode }
            >
              <ContextualMenuCustomizationWithNoWrapExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with a scroll bar and fixed direction'
              code={ ContextualMenuWithScrollBarExampleCode }
            >
              <ContextualMenuWithScrollBarExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with custom rendered menu items'
              code={ ContextualMenuWithCustomMenuItemExampleCode }
            >
              <ContextualMenuWithCustomMenuItemExample />
            </ExampleCard>

          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.types.ts'),
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ContextualMenuStatus }
          />
        }
      />
    );
  }
}
