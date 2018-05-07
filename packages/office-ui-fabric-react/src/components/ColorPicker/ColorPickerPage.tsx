import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { ColorPickerBasicExample } from './examples/ColorPicker.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ColorPickerStatus } from './ColorPicker.checklist';

const ColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/examples/ColorPicker.Basic.Example.tsx') as string;

export class ColorPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ColorPicker'
        componentName='ColorPickerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ColorPicker'
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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/ColorPicker.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ColorPicker/docs/ColorPickerOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ColorPickerStatus }
          />
        }
      />
    );
  }
}