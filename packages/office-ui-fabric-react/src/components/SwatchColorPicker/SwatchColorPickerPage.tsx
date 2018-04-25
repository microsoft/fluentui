import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SwatchColorPickerBasicExample } from './examples/SwatchColorPicker.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { SwatchColorPickerStatus } from './SwatchColorPicker.checklist';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SwatchColorPicker/examples/SwatchColorPicker.Basic.Example.tsx') as string;

export class SwatchColorPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='SwatchColorPicker'
        componentName='SwatchColorPickerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SwatchColorPicker'
        exampleCards={
          <ExampleCard title='SwatchColorPicker' code={ SwatchColorPickerBasicExampleCode }>
            <SwatchColorPickerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/SwatchColorPicker/SwatchColorPicker.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...SwatchColorPickerStatus }
          />
        }
      />
    );
  }
}
