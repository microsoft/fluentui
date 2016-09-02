import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { SliderBasicExample } from './examples/Slider.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';

const SliderBasicExampleCode = require('./examples/Slider.Basic.Example.tsx');

export class SliderPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'Slider');
  }

  public render() {
    return (
      <ComponentPage
        title='Slider'
        componentName='SliderExample'
        exampleCards={
          [
            <ExampleCard title='Slider' code={ SliderBasicExampleCode }>
              <SliderBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Slider' />
          ]
        }
        overview={
          <div>
            <span>Sliders provide a way for users to choose a value or an option.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
