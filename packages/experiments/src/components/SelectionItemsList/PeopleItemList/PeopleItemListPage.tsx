import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { PeopleSelectionItemsListExample } from '../examples/PeopleSelectionItemsList.Basic.Example';
const PeopleSelectionItemsListExampleCode =
  require('!raw-loader!experiments/src/components/SelectionItemsList/examples/PeopleSelectionItemsList.Basic.Example') as string;

export class PeopleItemListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='PeopleItemSelectionList'
        componentName='PeopleItemSelectionList'
        exampleCards={
          <div>
            <ExampleCard title='People Item Selection List' code={ PeopleSelectionItemsListExampleCode }>
              <PeopleSelectionItemsListExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/SelectionItemsList/BaseSelectionItemsList.props.ts')
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
              <li>Use them to represent a folder which may contain visual content.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>To represent the concept of a folder as opposed to an actual folder item.</li>
            </ul>
          </div>
        }
      />
    );
  }
}
