import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { CollapsibleSectionAccordionExample } from './CollapsibleSection.Accordion.Example';
const CollapsibleSectioAccordionExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Accordion.Example.tsx') as string;

import { CollapsibleSectionBasicExample } from './CollapsibleSection.Basic.Example';
const CollapsibleSectionBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Basic.Example.tsx') as string;

import { CollapsibleSectionSlotsExample } from './CollapsibleSection.Slots.Example';
const CollapsibleSectionSlotsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Slots.Example.tsx') as string;

import { CollapsibleSectionControlledExample } from './CollapsibleSection.Controlled.Example';
const CollapsibleSectionControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Controlled.Example.tsx') as string;

import { CollapsibleSectionRecursiveExample } from './CollapsibleSection.Recursive.Example';
const CollapsibleSectionRecursiveExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Recursive.Example.tsx') as string;

import { CollapsibleSectionStyledExample } from './CollapsibleSection.Styled.Example';
const CollapsibleSectionStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/CollapsibleSection/CollapsibleSection.Styled.Example.tsx') as string;

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
            <ExampleCard
              title="Collapsible Section Slots Customization"
              isOptIn={true}
              code={CollapsibleSectionSlotsExampleCode}
            >
              <CollapsibleSectionSlotsExample />
            </ExampleCard>
            <ExampleCard
              title="Recursive Collapsible Section"
              isOptIn={true}
              code={CollapsibleSectionRecursiveExampleCode}
            >
              <CollapsibleSectionRecursiveExample />
            </ExampleCard>
            <ExampleCard
              title="Controlled Collapsible Section"
              isOptIn={true}
              code={CollapsibleSectionControlledExampleCode}
            >
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
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/CollapsibleSection/CollapsibleSection.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
