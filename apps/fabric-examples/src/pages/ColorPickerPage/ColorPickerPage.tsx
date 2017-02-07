import * as React from 'react';
import {
  ExampleCard,
  IComponentPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';

const ColorPickerBasicExampleCode = require('./examples/ColorPicker.Basic.Example.tsx') as string;

export class ColorPickerPage extends React.Component<IComponentPageProps, {}> {
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
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/ColorPicker/ColorPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>ColorPicker is used to allow a user to select a color</div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
