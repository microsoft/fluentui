import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { AreaChartBasicExample } from './examples/AreaChart.Basic.Example';
import { AreaChartMultipleExample } from './examples/AreaChart.Multiple.Example';
import { AreaChartStyledExample } from './examples/AreaChart.Styled.Example';

const AreaChartBasicExampleCode = require('!raw-loader!@fluentui/examples/src/charting/AreaChart/examples/AreaChart.Basic.Example.tsx') as string;
const AreaChartMultipleExampleCode = require('!raw-loader!@fluentui/examples/src/charting/AreaChart/examples/AreaChart.Multiple.Example.tsx') as string;
const AreaChartStyledExampleCode = require('!raw-loader!@fluentui/examples/src/charting/AreaChart/examples/AreaChart.Styled.Example.tsx') as string;

export class AreaChart extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Area Chart"
        componentName="AreaChartBasicExample"
        exampleCards={
          <div>
            <ExampleCard title="Area Chart basic" code={AreaChartBasicExampleCode}>
              <AreaChartBasicExample />
            </ExampleCard>
            <ExampleCard title="Multiple Area chart" code={AreaChartMultipleExampleCode}>
              <AreaChartMultipleExample />
            </ExampleCard>
            <ExampleCard title="Styled Area chart" code={AreaChartStyledExampleCode}>
              <AreaChartStyledExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/AreaChart/AreaChart.types.ts')]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
