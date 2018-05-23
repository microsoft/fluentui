import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { CollapsibleSectionRecursiveExample } from './examples/CollapsibleSection.Recursive.Example';
const CollapsibleSectionRecursiveExampleCode =
  /* tslint:disable-next-line:max-line-length */
  require('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example.tsx') as string;

export class CollapsibleSectionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='CollapsibleSection'
        componentName='CollapsibleSection'
        exampleCards={
          <div>
            <ExampleCard title='Recursive Collapsible Section' isOptIn={ true } code={ CollapsibleSectionRecursiveExampleCode }>
              <CollapsibleSectionRecursiveExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!@uifabric/experiments/src/components/CollapsibleSection/CollapsibleSection.types.ts')
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
