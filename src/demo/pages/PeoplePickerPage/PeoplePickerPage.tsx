import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PeoplePickerTypesExample } from './examples/PeoplePicker.Types.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PeoplePickerTypesExampleCode = require('./examples/PeoplePicker.Types.Example.tsx');

export class PeoplePickerPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'PeoplePicker');
  }

  public render() {
    return (
      <ComponentPage
        title='PeoplePicker'
        componentName='PeoplePickerExample'
        exampleCards={
          <div>
              <ExampleCard title='People Pickers' code={ PeoplePickerTypesExampleCode }>
                <PeoplePickerTypesExample />
              </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='BasePicker' componentPath='components/pickers/' />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/PeoplePicker'> PeoplePicker </Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
