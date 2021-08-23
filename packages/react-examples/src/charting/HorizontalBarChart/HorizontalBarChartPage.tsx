import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { HorizontalBarChartBasicExample } from './HorizontalBarChart.Basic.Example';
import { HorizontalBarChartCustomCalloutExample } from './HorizontalBarChart.CustomCallout.Example';
import { HorizontalBarChartBenchmarkExample } from './HorizontalBarChart.Benchmark.Example';
import { HorizontalBarChartCustomAccessibilityExample } from './HorizontalBarChart.CustomAccessibility.Example';

const HorizontalBarChartBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/HorizontalBarChart/HorizontalBarChart.Basic.Example.tsx') as string;
const HorizontalBarChartCustomCalloutExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/HorizontalBarChart/HorizontalBarChart.CustomCallout.Example.tsx') as string;
const HorizontalBarChartBenchmarkExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/HorizontalBarChart/HorizontalBarChart.Benchmark.Example.tsx') as string;
const HorizontalBarChartCustomAccessibilityExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/HorizontalBarChart/HorizontalBarChart.CustomAccessibility.Example.tsx') as string;
export class HorizontalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="HorizontalBarChart"
        componentName="HorizontalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="HorizontalBarChart basic" code={HorizontalBarChartBasicExampleCode}>
              <HorizontalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="HorizontalBarChart Custom Callout" code={HorizontalBarChartCustomCalloutExampleCode}>
              <HorizontalBarChartCustomCalloutExample />
            </ExampleCard>
            <ExampleCard title="HorizontalBarChart with benchmark" code={HorizontalBarChartBenchmarkExampleCode}>
              <HorizontalBarChartBenchmarkExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChart Custom Accessibility"
              code={HorizontalBarChartCustomAccessibilityExampleCode}
            >
              <HorizontalBarChartCustomAccessibilityExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/charting/src/components/HorizontalBarChart/HorizontalBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
