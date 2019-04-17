import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

export class StaticListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="StaticList"
        componentName="StaticList"
        exampleCards={<div />}
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/StaticList/StaticList.types.ts')]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use to render a list of items.</li>
            </ul>
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
