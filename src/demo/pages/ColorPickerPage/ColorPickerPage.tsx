import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const ColorPickerBasicExampleCode = require('./examples/ColorPicker.Basic.Example.tsx');

export class ColorPickerPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Checkbox');
  }

  public render() {
    return (
      <ComponentPage
        title='ColorPicker'
        componentName='ColorPickerExample'
        exampleCards={
          [
            <ExampleCard
              title='ColorPicker'
              code={ ColorPickerBasicExampleCode }>
              <ColorPickerBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='ColorPicker' />
          ]
        }
        overview={
          <div>ColorPicker is used to allow a user to select a color</div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
