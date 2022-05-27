import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { HorizontalBarChartBasicExample } from './HorizontalBarChart.Basic.Example';
import { HorizontalBarChartCustomCalloutExample } from './HorizontalBarChart.CustomCallout.Example';
import { HorizontalBarChartBenchmarkExample } from './HorizontalBarChart.Benchmark.Example';
import { HorizontalBarChartCustomAccessibilityExample } from './HorizontalBarChart.CustomAccessibility.Example';

const HorizontalBarChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Basic.Example.tsx') as string;
const HorizontalBarChartCustomCalloutExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomCallout.Example.tsx') as string;
const HorizontalBarChartBenchmarkExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Benchmark.Example.tsx') as string;
const HorizontalBarChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomAccessibility.Example.tsx') as string;

export class HorizontalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Horizontal Bar Chart"
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
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/HorizontalBarChart/HorizontalBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Use a horizontal bar graph to compare between different values that are hierarchically equivalent. The
              rectangular bar length is proportional to the values they represent. There will always be a maximum data
              value (color) that is used to represent the total length.
            </p>
            <p>Numerical values are represented through abbreviations. </p>
          </div>
        }
      />
    );
  }
}
