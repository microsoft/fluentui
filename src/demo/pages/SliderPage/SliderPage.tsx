import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { SliderBasicExample } from './examples/Slider.Basic.Example';

const SliderBasicExampleCode = require('./examples/Slider.Basic.Example.tsx');

export class SliderPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='SliderExample'>
        <h1 className='ms-font-xxl'>Slider</h1>
        <div>
          <span>Sliders provide a way for users to choose a value or an option.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Slider' code={ SliderBasicExampleCode }>
          <SliderBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Slider' />
      </div>
    );
  }
}
