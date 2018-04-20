import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { items, overflowItems, farItems } from './examples/data';
import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';
import { CommandBarCustomizationExample } from './examples/CommandBar.Customization.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CommandBarStatus } from './CommandBar.checklist';

const CommandBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx') as string;
const CommandBarNoFocusableItemsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.NonFocusable.Example.tsx') as string;
const CommandBarCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Customization.Example.tsx') as string;

export class CommandBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    const cmdBarParamsTextAndIcons: any = { items, overflowItems, farItems };

    return (
      <ComponentPage
        title='CommandBar'
        componentName='CommandBarExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/CommandBar'
        exampleCards={
          <div>
            <ExampleCard title='CommandBar with search box and overflowing menu items' code={ CommandBarBasicExampleCode }>
              <CommandBarBasicExample { ...cmdBarParamsTextAndIcons } />
            </ExampleCard>
            <ExampleCard title='CommandBar with non-focusable items' code={ CommandBarNoFocusableItemsExampleCode }>
              <CommandBarNonFocusableItemsExample />
            </ExampleCard>
            <ExampleCard title='CommandBar with customized rendered items' code={ CommandBarCustomizationExampleCode }>
              <CommandBarCustomizationExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/CommandBar.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...CommandBarStatus }
          />
        }
      />
    );
  }

}
