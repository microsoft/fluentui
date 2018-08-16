import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { DonutChartBasicExample } from './examples/DonutChart.Basic.Example';

const DonutChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/DonutChart/examples/DonutChart.Basic.Example.tsx') as string;

export class DonutChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="DonutChart"
        componentName="DonutChartExample"
        exampleCards={
          <div>
            <ExampleCard title="DonutChart basic" code={DonutChartBasicExampleCode}>
              <DonutChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/DonutChart/DonutChart.types.ts')]}
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>DonutChart description</p>
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
        related={<a href="https://dev.office.com/fabric-js/Components/DonutChart/DonutChart.html">Fabric JS</a>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
