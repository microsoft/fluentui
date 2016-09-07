import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const CheckboxBasicExampleCode = require('./examples/Checkbox.Basic.Example.tsx');

export class CheckboxPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Checkbox');
  }

  public render() {
    return (
      <ComponentPage
        title='Checkbox'
        componentName='CheckboxExample'
        exampleCards={
          [
            <ExampleCard title='Checkboxes' code={ CheckboxBasicExampleCode }>
              <CheckboxBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Checkbox' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/checkbox'>Checkboxes</Link>
            <span> allow the user to enable or disable a setting.</span>
          </div>
        }
        route={ this._url }
        showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
