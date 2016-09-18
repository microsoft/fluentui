import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DatePickerBasicExample } from './examples/DatePicker.Basic.Example';
import { DatePickerRequiredExample } from './examples/DatePicker.Required.Example';
import { DatePickerInputExample } from './examples/DatePicker.Input.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const DatePickerBasicExampleCode = require('./examples/DatePicker.Basic.Example.tsx');
const DatePickerRequiredExampleCode = require('./examples/DatePicker.Required.Example.tsx');
const DatePickerInputExampleCode = require('./examples/DatePicker.Input.Example.tsx');

export class DatePickerPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'DatePicker');
  }
  public render() {
    return (
      <ComponentPage
        title='DatePicker'
        componentName='DatePickerExample'
        exampleCards={
          [
            <ExampleCard title='DatePicker' code={ DatePickerBasicExampleCode }>
              <DatePickerBasicExample />
            </ExampleCard>,
            <ExampleCard title='DatePicker as required field' code={ DatePickerRequiredExampleCode }>
              <DatePickerRequiredExample />
            </ExampleCard>,
            <ExampleCard title='DatePicker allows input date string' code={ DatePickerInputExampleCode }>
              <DatePickerInputExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
           <PropertiesTableSet componentName='DatePicker' />
          ]
        }
        overview={
          <div>
            Date pickers provide a menu for use in context menus and dropdowns.
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/DatePicker.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
