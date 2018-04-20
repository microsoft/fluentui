import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { ComboBoxBasicExample } from './examples/ComboBox.Basic.Example';
import { ComboBoxCustomStyledExample } from './examples/ComboBox.CustomStyled.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ComboBoxStatus } from './ComboBox.checklist';

const ComboBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Basic.Example.tsx') as string;
const ComboBoxCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.CustomStyled.Example.tsx') as string;

export class ComboBoxPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ComboBox'
        componentName='ComboBoxExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ComboBox'
        exampleCards={
          <div>
            <ExampleCard title='ComboBox' code={ ComboBoxBasicExampleCode }>
              <ComboBoxBasicExample />
            </ExampleCard>
            <ExampleCard title='ComboBoxCustomStyled' code={ ComboBoxCustomStyledExampleCode }>
              <ComboBoxCustomStyledExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/ComboBox.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/docs/ComboBoxDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ComboBoxStatus }
          />
        }
      />
    );
  }
}
