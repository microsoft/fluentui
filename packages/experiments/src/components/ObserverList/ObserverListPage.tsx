import { ExampleCard, ComponentPage, IComponentPageProps } from '@uifabric/example-app-base';
import * as React from 'react';
import { ObserverListExample } from './examples/ObserverList.Example';

export const ObserverListPage = (props: IComponentPageProps): JSX.Element => {
  const { isHeaderVisible } = props;

  return (
    <ComponentPage
      title="ObserverListExample"
      componentName="ObserverListExample"
      exampleCards={
        <div>
          <ExampleCard title="ObserverList">
            <ObserverListExample />
          </ExampleCard>
        </div>
      }
      isHeaderVisible={isHeaderVisible}
    />
  );
};
