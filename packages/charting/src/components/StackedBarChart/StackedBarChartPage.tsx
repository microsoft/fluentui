import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { StackedBarChartBasicExample } from './examples/StackedBarChart.Basic.Example';
import { StackedBarChartMultiExample } from './examples/StackedBarChart.Multi.Example';

const StackedBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Basic.Example.tsx') as string;

const StackedBarChartMultiExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Multi.Example.tsx') as string;

export class StackedBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="StackedBarChart"
        componentName="StackedBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="StackedBarChart" code={StackedBarChartBasicExampleCode}>
              <StackedBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="StackedBarChart" code={StackedBarChartMultiExampleCode}>
              <StackedBarChartMultiExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/charting/src/components/StackedBarChart/StackedBarChart.types.ts')
            ]}
          />
        }
        overview={
          <div>
            <p>StackedBarChart description</p>
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
        related={
          <a href="https://dev.office.com/fabric-js/Components/StackedBarChart/StackedBarChart.html">Fabric JS</a>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
