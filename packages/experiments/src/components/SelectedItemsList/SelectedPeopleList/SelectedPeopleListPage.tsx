import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { PeopleSelectedItemsListExample } from '../examples/SelectedPeopleList.Basic.Example';
const PeopleSelectedItemsListExampleCode =
  require('!raw-loader!experiments/src/components/SelectedItemsList/examples/SelectedPeopleList.Basic.Example') as string;

export class SelectedPeopleListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='SelectedPeopleList'
        componentName='SelectedPeopleList'
        exampleCards={
          <div>
            <ExampleCard title='Selected People List' code={ PeopleSelectedItemsListExampleCode }>
              <PeopleSelectedItemsListExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/SelectedItemsList/BaseSelectedItemsList.types.ts')
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
              <li>Use them to represent list of selected people.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use for other items besides selected people</li>
            </ul>
          </div>
        }
      />
    );
  }
}
