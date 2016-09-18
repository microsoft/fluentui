import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';
import { items, farItems } from './examples/data';

import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');
const CommandBarNoFocusableItemsExampleCode = require('./examples/CommandBar.NonFocusable.Example.tsx');

export class CommandBarPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'CommandBar');
  }

  public render() {
    let cmdBarParamsTextAndIcons: any = { items: items, farItems: farItems };

    return (
      <ComponentPage
        title='CommandBar'
        componentName='CommandBarExample'
        exampleCards={
          [
            <ExampleCard title='CommandBar with search box and overflowing menu items' code={ CommandBarBasicExampleCode }>
              <CommandBarBasicExample {... cmdBarParamsTextAndIcons} />
            </ExampleCard>,
            <ExampleCard title='CommandBar with non-focusable items' code={ CommandBarNoFocusableItemsExampleCode }>
              <CommandBarNonFocusableItemsExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='CommandBar' />,
            <PropertiesTableSet componentName='ContextualMenu' renderOnly={ ['IContextualMenuItem'] } />
          ]
        }
        overview={
          <div>
           Command bars provide a menu control to expose application commands. Command bars typically are rendered just below the header.
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/CommandBar.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
