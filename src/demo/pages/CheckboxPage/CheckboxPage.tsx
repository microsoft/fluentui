import * as React from 'react';
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
            Checkboxes allow the user to enable or disable a setting.
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Checkbox.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
