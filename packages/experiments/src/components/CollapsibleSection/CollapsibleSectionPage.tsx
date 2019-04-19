import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { CollapsibleSectionAccordionExample } from './examples/CollapsibleSection.Accordion.Example';
const CollapsibleSectioAccordionExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Accordion.Example.tsx') as string;

import { CollapsibleSectionBasicExample } from './examples/CollapsibleSection.Basic.Example';
const CollapsibleSectionBasicExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Basic.Example.tsx') as string;

import { CollapsibleSectionSlotsExample } from './examples/CollapsibleSection.Slots.Example';
const CollapsibleSectionSlotsExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Slots.Example.tsx') as string;

import { CollapsibleSectionControlledExample } from './examples/CollapsibleSection.Controlled.Example';
const CollapsibleSectionControlledExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Controlled.Example.tsx') as string;

import { CollapsibleSectionRecursiveExample } from './examples/CollapsibleSection.Recursive.Example';
const CollapsibleSectionRecursiveExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example.tsx') as string;

import { CollapsibleSectionStyledExample } from './examples/CollapsibleSection.Styled.Example';
const CollapsibleSectionStyledExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Styled.Example.tsx') as string;

export class CollapsibleSectionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="CollapsibleSection"
        componentName="CollapsibleSection"
        exampleCards={
          <div>
            <ExampleCard title="Basic Collapsible Section" isOptIn={true} code={CollapsibleSectionBasicExampleCode}>
              <CollapsibleSectionBasicExample />
            </ExampleCard>
            <ExampleCard title="Collapsible Section Slots Customization" isOptIn={true} code={CollapsibleSectionSlotsExampleCode}>
              <CollapsibleSectionSlotsExample />
            </ExampleCard>
            <ExampleCard title="Recursive Collapsible Section" isOptIn={true} code={CollapsibleSectionRecursiveExampleCode}>
              <CollapsibleSectionRecursiveExample />
            </ExampleCard>
            <ExampleCard title="Controlled Collapsible Section" isOptIn={true} code={CollapsibleSectionControlledExampleCode}>
              <CollapsibleSectionControlledExample />
            </ExampleCard>
            <ExampleCard title="Styled Collapsible Section" isOptIn={true} code={CollapsibleSectionStyledExampleCode}>
              <CollapsibleSectionStyledExample />
            </ExampleCard>
            <ExampleCard title="Accordion" isOptIn={true} code={CollapsibleSectioAccordionExampleCode}>
              <CollapsibleSectionAccordionExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/CollapsibleSection.types.ts')]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to represent an item in a card with relevant metadata.</li>
            </ul>
          </div>
        }
        donts={
          // @todo: fill in description
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
