import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PredefinedColorPickerBasicExample } from '../examples/PredefinedColorPicker.Basic.Example';

const PredefinedColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/PredefinedColorPicker/examples/PredefinedColorPicker.Basic.Example.tsx') as string;

export class PredefinedColorPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='PredefinedColorPicker'
        componentName='PredefinedColorPickerExample'
        exampleCards={
          <ExampleCard
            title='PredefinedColorPicker'
            code={ PredefinedColorPickerBasicExampleCode }>
            <PredefinedColorPickerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/PredefinedColorPicker/PredefinedColorPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>PredefinedColorPicker is used to allow a user to select a color from a specific set</div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
