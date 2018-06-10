import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';
import { CheckboxImplementationExamples } from './examples/Checkbox.ImplementationExamples';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CheckboxStatus } from './Checkbox.checklist';

const CheckboxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Basic.Example.tsx') as string;
const CheckboxImplementationExamplesCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.ImplementationExamples.tsx') as string;

export class CheckboxPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Checkbox'
        componentName='CheckboxExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Checkbox'
        exampleCards={
          <div>
            <ExampleCard
              title='Default Checkbox'
              code={ CheckboxBasicExampleCode }
            >
              <CheckboxBasicExample />
            </ExampleCard>

            <ExampleCard
              title='Implementation Examples'
              code={ CheckboxImplementationExamplesCode }
            >
              <CheckboxImplementationExamples />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/Checkbox.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...CheckboxStatus }
          />
        }
      />
    );
  }
}