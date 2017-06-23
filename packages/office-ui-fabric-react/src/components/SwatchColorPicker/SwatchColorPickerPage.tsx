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
          <ExampleCard title='SwatchColorPicker' code={ SwatchColorPickerBasicExampleCode }>
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
          <div>
            <p>
              A SwatchColorPicker is a list of colors displayed as a grid as options for the user. It can be displayed by itself, with header and/or dividers, or as a button which expands to show the swatch color picker
            </p>
          </div>
        }
        dos={
          <div>
            <ul>
              <li>Use a SwatchColorPicker when there are multiple finite choices that can be grouped and/or collapsed under one title.</li>
              <li>SwatchColorPickers contain a grid of colors.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Do not use a SwatchColorPicker when there are a a very large number of color choices. The best component for to that is a ColorPicker.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/SwatchColorPicker/SwatchColorPicker.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
