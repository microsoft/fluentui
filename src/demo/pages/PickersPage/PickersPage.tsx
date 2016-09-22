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
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const TagPickerExampleCode = require('./examples/TagPicker.Basic.Example');
const PeoplePickerTypesExampleCode = require('./examples/PeoplePicker.Types.Example.tsx');
const PickerCustomResultExampleCode = require('./examples/Picker.CustomResult.Example');

export class PickersPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'PeoplePicker');
  }

  public render() {
    return (
      <ComponentPage
        title='Pickers'
        componentName='PickersExample'
        exampleCards={
          [
            <div className='PeoplePickerExample'>
              <h1 className='ms-font-xxl'> TagPicker </h1>
              <div>
                <span> TagPickers are used to pick tags.</span>
              </div>
              <h2 className='ms-font-xl'> Examples </h2>
              <ExampleCard title='TagPicker' code={ TagPickerExampleCode }>
                <TagPickerBasicExample />
              </ExampleCard>
              <h1 className='ms-font-xxl'> PeoplePicker </h1>
              <div>
                <Link target='_blank' href='http://dev.office.com/fabric/components/peoplepickers'> PeoplePickers </Link>
                <span> are used to pick recipients.</span>
              </div>
              <h2 className='ms-font-xl'> Examples </h2>
              <ExampleCard title='People Pickers' code={ PeoplePickerTypesExampleCode }>
                <PeoplePickerTypesExample />
              </ExampleCard>
              <h1 className='ms-font-xxl'> Custom Pickers </h1>
              <div>
                <span> Pickers can be expanded to display almost anything</span>
              </div>
              <h2 className='ms-font-xl'> Examples </h2>
              <ExampleCard title='Document Picker' code={ PickerCustomResultExampleCode }>
                <PickerCustomResultExample />
              </ExampleCard>
            </div>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='BasePicker' componentPath='components/pickers/' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Pickers'> Pickers </Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
