import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ColorPickerStatus } from './ColorPicker.checklist';

const ColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/examples/ColorPicker.Basic.Example.tsx') as string;

export class ColorPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ColorPicker'
        componentName='ColorPickerExample'
        exampleCards={
          <ExampleCard
            title='Default ColorPicker'
            code={ ColorPickerBasicExampleCode }
          >
            <ColorPickerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/ColorPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>ColorPicker is used to allow a user to select a color</div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ColorPickerStatus}
          />
        }
      />
    );
  }
}