import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/demoComponents';

import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ColorPickerBasicExampleCode = require('./examples/ColorPicker.Basic.Example.tsx') as string;

export class ColorPickerPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='ColorPicker'
        componentName='ColorPickerExample'
        exampleCards={
          <ExampleCard
            title='ColorPicker'
            code={ ColorPickerBasicExampleCode }>
            <ColorPickerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='ColorPicker' />
        }
        overview={
          <div>ColorPicker is used to allow a user to select a color</div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
