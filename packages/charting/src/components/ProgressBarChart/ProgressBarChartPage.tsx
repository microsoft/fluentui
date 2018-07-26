import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { ProgressBarChartBasicExample } from './examples/ProgressBarChart.Basic.Example';

const ProgressBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/ProgressBarChart/examples/ProgressBarChart.Basic.Example.tsx') as string;

export class ProgressBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="ProgressBarChart"
        componentName="ProgressBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="ProgressBarChart" code={ProgressBarChartBasicExampleCode}>
              <ProgressBarChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/charting/src/components/ProgressBarChart/ProgressBarChart.types.ts')
            ]}
          />
        }
        overview={
          <div>
            <p>ProgressBarChart description</p>
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
          <a href="https://dev.office.com/fabric-js/Components/ProgressBarChart/ProgressBarChart.html">Fabric JS</a>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
