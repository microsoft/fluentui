import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { VerticalStackedBarChartBasicExample } from './examples/VerticalStackedBarChart.Basic.Example';
import { VerticalStackedBarChartStyledExample } from './examples/VerticalStackedBarChart.Styled.Example';

const VerticalBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/VerticalStackedBarChart/examples/VerticalStackedBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode = require('!raw-loader!@uifabric/charting/src/components/VerticalStackedBarChart/examples/VerticalStackedBarChart.Styled.Example.tsx') as string;

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="VerticalBarChart"
        componentName="VerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="VerticalStackedBarChart basic" code={VerticalBarChartBasicExampleCode}>
              <VerticalStackedBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Styled" code={VerticalBarChartStyledExampleCode}>
              <VerticalStackedBarChartStyledExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/charting/src/components/VerticalStackedBarChart/VerticalStackedBarChart.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>VerticalStackedBarChart description</p>
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
