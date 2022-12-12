import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';

const HorizontalBarChartWithAxisBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Basic.Example.tsx') as string;
const HorizontalBarChartWithAxisTooltipExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisStringAxisTooltipExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.StringAxisTooltip.Example.tsx') as string;

export class HorizontalBarChartWithAxisPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Horizontal Bar Chart"
        componentName="HorizontalBarChartWithAxisExample"
        exampleCards={
          <div>
            <ExampleCard title="HorizontalBarChartWithAxis basic" code={HorizontalBarChartWithAxisBasicExampleCode}>
              <HorizontalBarChartWithAxisBasicExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis Custom Callout"
              code={HorizontalBarChartWithAxisTooltipExampleCode}
            >
              <HorizontalBarChartWithAxisTooltipExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis with benchmark"
              code={HorizontalBarChartWithAxisStringAxisTooltipExampleCode}
            >
              <HorizontalBarChartWithAxisStringAxisTooltipExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.types.ts'),
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
          </div>
        }
      />
    );
  }
}
