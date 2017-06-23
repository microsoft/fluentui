import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SwatchColorPickerBasicExample } from './examples/SwatchColorPicker.Basic.Example';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SwatchColorPicker/examples/SwatchColorPicker.Basic.Example.tsx') as string;

export class SwatchColorPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='SwatchColorPicker'
        componentName='SwatchColorPickerExample'
        exampleCards={
          <ExampleCard
            title='SwatchColorPicker'
            code={ SwatchColorPickerBasicExampleCode }>
            <SwatchColorPickerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/SwatchColorPicker/SwatchColorPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>SwatchColorPicker is used to allow a user to select a color from a specific set (e.g. swatch)</div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
