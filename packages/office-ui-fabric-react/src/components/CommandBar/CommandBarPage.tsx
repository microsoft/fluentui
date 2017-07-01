import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { items, overflowItems, farItems } from './examples/data';
import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';
import { CommandBarCustomizationExample } from './examples/CommandBar.Customization.Example';

const CommandBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx') as string;
const CommandBarNoFocusableItemsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.NonFocusable.Example.tsx') as string;
const CommandBarCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Customization.Example.tsx') as string;

export class CommandBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    let cmdBarParamsTextAndIcons: any = { items, overflowItems, farItems };

    return (
      <ComponentPage
        title='CommandBar'
        componentName='CommandBarExample'
        exampleCards={
          <div>
            <ExampleCard title='CommandBar with search box and overflowing menu items' code={ CommandBarBasicExampleCode }>
              <CommandBarBasicExample {...cmdBarParamsTextAndIcons} />
            </ExampleCard>
            {/*<ExampleCard title='CommandBar with non-focusable items' code={ CommandBarNoFocusableItemsExampleCode }>
              <CommandBarNonFocusableItemsExample />
            </ExampleCard>
            <ExampleCard title='CommandBar with customized renderred items' code={ CommandBarCustomizationExampleCode }>
              <CommandBarCustomizationExample />
            </ExampleCard>*/}
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/CommandBar.Props.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.Props.ts')
            ] }
          />
        }
        overview={
          <div>1
          </div>
        }
        isHeaderVisible={ false }>
      </ComponentPage>
    );
  }

}
