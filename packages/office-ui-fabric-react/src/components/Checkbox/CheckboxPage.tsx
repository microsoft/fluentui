import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';
import { CheckboxImplementationExamples } from './examples/Checkbox.ImplementationExamples';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CheckboxStatus } from './Checkbox.checklist';

const CheckboxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Basic.Example.tsx') as string;
const CheckboxImplementationExamplesCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.ImplementationExamples.tsx') as string;

export class CheckboxPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title={ 'Checkbox' }
        componentName='CheckboxExample'
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
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div />
        }
        donts={
          <div />
        }
        isHeaderVisible={ false }
      />
    );
  }
}