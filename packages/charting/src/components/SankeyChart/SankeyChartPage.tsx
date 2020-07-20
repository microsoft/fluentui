import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { SankeyChartBasicExample } from './examples/SankeyChart.Basic.Example';

const SankeyChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/SankeyChart/examples/SankeyChart.Basic.Example.tsx') as string;

export class SankeyChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SankeyChart"
        componentName="SankeyChartExample"
        exampleCards={
          <div>
            <ExampleCard title="SankeyChart basic" code={SankeyChartBasicExampleCode}>
              <SankeyChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/charting/src/components/SankeyChart/SankeyChart.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>SankeyChart description</p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
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
