import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { LineChartBasicExample } from './examples/LineChart.Basic.Example';
import { LineChartStyledExample } from './examples/LineChart.Styled.Example';
import { LineChartMultipleExample } from './examples/LineChart.Multiple.Example';

const LineChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/LineChart/examples/LineChart.Basic.Example.tsx') as string;
const LineChartStyledExampleCode = require('!raw-loader!@uifabric/charting/src/components/LineChart/examples/LineChart.Styled.Example.tsx') as string;
const MultipleLineChartExampleCode = require('!raw-loader!@uifabric/charting/src/components/LineChart/examples/LineChart.Multiple.Example.tsx') as string;

export class LineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="LineChart"
        componentName="LineChartExample"
        exampleCards={
          <div>
            <ExampleCard title="LineChart basic" code={LineChartBasicExampleCode}>
              <LineChartBasicExample />
            </ExampleCard>
            <ExampleCard title="LineChart styled" code={LineChartStyledExampleCode}>
              <LineChartStyledExample />
            </ExampleCard>
            <ExampleCard title="Multiple Line chart" code={MultipleLineChartExampleCode}>
              <LineChartMultipleExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/charting/src/components/LineChart/LineChart.types.ts')]} />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>LineChart description</p>
          </div>
        }
        /* tslint:enable:max-line-length */
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
