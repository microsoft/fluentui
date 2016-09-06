import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const DropdownBasicExampleCode = require('./examples/Dropdown.Basic.Example.tsx');

export class DropdownPage extends React.Component<any, any> {
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
          [
            <ExampleCard title='Dropdown' code={ DropdownBasicExampleCode }>
              <DropdownBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Dropdown' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/dropdown'>Dropdowns</Link>
            <span> provide a way for users to choose an option.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
