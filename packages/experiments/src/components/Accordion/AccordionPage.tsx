import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { AccordionBasicExample } from './examples/Accordion.Basic.Example';
const AccordionBasicExampleCode =
  require('!raw-loader!@uifabric/experiments/src/components/Accordion/examples/Accordion.Basic.Example.tsx') as string;

export class AccordionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Accordion'
        componentName='Accordion'
        exampleCards={
          <div>
            <ExampleCard title='Basic Medium-sized Accordion' isOptIn={ true } code={ AccordionBasicExampleCode }>
              <AccordionBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!@uifabric/experiments/src/components/Accordion/Accordion.types.ts')
            ] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent an item in a card with relevant metadata.</li>
            </ul>
          </div>
        }
        donts={ // @todo: fill in description
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
