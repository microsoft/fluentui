import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';

const ColorPickerBasicExampleCode = require('./examples/ColorPicker.Basic.Example.tsx');

export class ColorPickerPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ColorPickerExample'>
        <h1 className='ms-font-xxl'>ColorPicker</h1>
        <div>ColorPicker is used to allow a user to select a color</div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='ColorPicker'
          code={ ColorPickerBasicExampleCode }
        >
          <ColorPickerBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='ColorPicker' />
      </div>
    );
  }
}
