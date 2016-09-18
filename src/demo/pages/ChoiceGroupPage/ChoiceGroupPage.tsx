import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');

export class ChoiceGroupPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'ChoiceGroup');
  }

  public render() {
    return (
      <ComponentPage
        title='ChoiceGroup'
        componentName='ChoiceGroupExample'
        exampleCards={
          [
            <ExampleCard title='ChoiceGroups' code={ ChoiceGroupBasicExampleCode }>
              <ChoiceGroupBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='ChoiceGroup' />
          ]
        }
        overview={
          <div>
            Choice groups allow the user to choose one of many options.
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ChoiceFieldGroup.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
