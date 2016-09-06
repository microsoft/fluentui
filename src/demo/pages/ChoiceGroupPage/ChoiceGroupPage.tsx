import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');

export class ChoiceGroupPage extends React.Component<any, any> {
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
            <Link target='_blank' href='http://dev.office.com/fabric/components/choiceGroup'>ChoiceGroups</Link>
            <span> allow the user to choose one of many options.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
