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
import { HorizontalBarChartVariantExample } from './HorizontalBarChart.Variant.Example';
import { HorizontalBarChartModeExample } from './HorizontalBarChart.ChartMode.Example';

const HorizontalBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Basic.Example.tsx') as string;
const HorizontalBarChartCustomCalloutExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomCallout.Example.tsx') as string;
const HorizontalBarChartBenchmarkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Benchmark.Example.tsx') as string;
const HorizontalBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomAccessibility.Example.tsx') as string;
const HorizontalBarChartVariantExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Variant.Example.tsx') as string;
const HorizontalBarChartModeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.ChartMode.Example.tsx') as string;

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
            <ExampleCard title="HorizontalBarChart Variant" code={HorizontalBarChartVariantExampleCode}>
              <HorizontalBarChartVariantExample />
            </ExampleCard>
            <ExampleCard title="HorizontalBarChart Mode" code={HorizontalBarChartModeExampleCode}>
              <HorizontalBarChartModeExample />
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
            <h4>Bar chart custom data</h4>
            <p>
              This property allows customizing the right side data part of the chart. See the usage of
              <code>barChartCustomData</code>
              prop in custom callout variant.
            </p>
            <h4>Custom hover callout</h4>
            <p>
              See <code>onRenderCalloutPerHorizontalBar</code> prop to customize the hover callout.
            </p>
            <p>
              Set the <code>chartDataMode</code> as number, fraction or percentage to specify how numerical values will
              be shown on the chart.
            </p>
            <h4>Benchmark data</h4>
            <p>
              Set the <code>data</code> attribute of IChartDataPoint to specify the benchmark value. The benchmark value
              is shown as an inverted triangle in the chart.
            </p>
            <h4>AbsoluteScale variant</h4>
            <p>
              The bar labels are shown by default in the absolute-scale variant. Set the <code>hideLabels</code> prop to
              hide them.
            </p>
          </div>
        }
      />
    );
  }
}
