import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const DropdownBasicExampleCode = require('./examples/Dropdown.Basic.Example.tsx');

export class DropdownPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Dropdown');
  }

  public render() {
    return (
      <ComponentPage
        title='Dropdown'
        componentName='DropdownExample'
        exampleCards={
          <ExampleCard title='Dropdown' code={ DropdownBasicExampleCode }>
            <DropdownBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Dropdown' />
        }
        overview={
          <div>
            <p>
              A Dropdown is a list in which the selected item is always visible, and the others are visible on demand by clicking a drop-down button. They are used to simplify the design and make a choice within the UI. When closed, only the selected item is visible. When users click the drop-down button, all the options become visible. To change the value, users open the list and click another value or use the arrow keys (up and down) to select a new value.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a Dropdown when there are multiple choices that can be collapsed under one title. Or if the list of items is long or when space is constrained.</li>
              <li>Dropdowns contain shortened statements or words.</li>
              <li>Use a Dropdown when the selected option is more important than the alternatives (in contrast to radio buttons where all the choices are visible putting more emphasis on the other options).</li>
            </ul>
          </div>
        }
        donts={
          <div></div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Dropdown.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
