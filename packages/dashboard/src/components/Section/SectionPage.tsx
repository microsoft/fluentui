import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SectionBasicExample } from './examples/Section.Basic.Example';
const SectionBasicExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Section/examples/Section.Basic.Example.tsx') as string;

export class SectionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Section"
        componentName="Section"
        exampleCards={
          <div>
            <ExampleCard title="Section" isScrollable={true} isOptIn={true} code={SectionBasicExampleCode}>
              <SectionBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/Section/Section.types.ts')]}
          />
        }
        overview={<div>This component creates a section title for dashboard grid layout</div>}
        bestPractices={<div />}
        dos={
          <div>
            <ul />
          </div>
        }
        donts={
          <div>
            <ul />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
