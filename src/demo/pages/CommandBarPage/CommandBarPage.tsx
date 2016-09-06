import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';
import { items, farItems } from './examples/data';

import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');
const CommandBarNoFocusableItemsExampleCode = require('./examples/CommandBar.NonFocusable.Example.tsx');

export class CommandBarPage extends React.Component<any, any> {
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
           <Link target='_blank' href='http://dev.office.com/fabric/components/commandBar'>CommandBars</Link>
          <span> provide a menu control to expose application commands. Command bars typically are rendered just below the header.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
