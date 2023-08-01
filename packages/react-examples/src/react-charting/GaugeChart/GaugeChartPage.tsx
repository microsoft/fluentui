import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { GaugeChartBasicExample } from './GaugeChart.Basic.Example';
import { GaugeChartSingleSegmentExample } from './GaugeChart.SingleSegment.Example';

const GaugeChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.Basic.Example.tsx') as string;
const GaugeChartSingleSegmentExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.Variant.Example.tsx') as string;

export class GaugeChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Gauge Chart"
        componentName="GaugeChartExample"
        exampleCards={
          <div>
            <ExampleCard title="GaugeChart basic" code={GaugeChartBasicExampleCode}>
              <GaugeChartBasicExample />
            </ExampleCard>
            <ExampleCard title="GaugeChart single segment variant" code={GaugeChartSingleSegmentExampleCode}>
              <GaugeChartSingleSegmentExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/GaugeChart/GaugeChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Gauge chart measures the progress of a metric against its target and its primary components are a
              speedometer and a needle. The speedometer usually consists of color-coded segments progressing value from
              left to right.
            </p>
            <h3>Implementation details</h3>
            <div>Here are the props available for customizing the gauge chart:</div>
            <ul>
              <li>
                <code>width</code> and <code>height</code>: These props determine the diameter of the gauge. If not
                provided, a default diameter of 140px is used.
              </li>
              <li>
                <code>chartTitle</code>: Use this prop to render a title above the gauge.
              </li>
              <li>
                <code>chartValue</code>: This required prop controls the rotation of the needle. If the chart value is
                less than the minimum, the needle points to the min value. Similarly, if it exceeds the maximum, the
                needle points to the max value.
              </li>
              <li>
                <code>segments</code>: Use this required prop to divide the gauge into colored sections. The segments
                can have fixed sizes or vary with the chart value to create a sweeping effect. Negative segment sizes
                are treated as 0.
              </li>
              <li>
                <code>minValue</code>: Use this prop if the minimum value of the gauge is different from 0.
              </li>
              <li>
                <code>maxValue</code>: Use this prop to render a placeholder segment when the desired range for the
                gauge is more than the sum of all segments. If the maxValue is less than the sum of all segments, this
                property is ignored.
              </li>
              <li>
                <code>sublabel</code>: Use this prop to render additional text below the chart value.
              </li>
              <li>
                <code>hideMinMax</code>: Set this prop to true to hide the min and max labels of the gauge.
              </li>
              <li>
                <code>chartValueFormat</code>: This prop controls how the chart value is displayed. Set it to one of the
                following options:
                <ul>
                  <li>A custom formatter function that returns a string representing the chart value.</li>
                  <li>
                    <code>GaugeValueFormat.Fraction</code>: Renders the chart value as a fraction.
                  </li>
                  <li>
                    <code>GaugeValueFormat.Percentage</code>: Renders the chart value as a percentage. This is the
                    default format.
                  </li>
                </ul>
                Note: If the min value is non-zero and no formatter function is provided, the chart value will be
                rendered as a number.
              </li>
              <li>
                <code>variant</code>: This prop determines the presentation style of the gauge chart. Set it to one of
                the following options:
                <ul>
                  <li>
                    <code>GaugeChartVariant.SingleSegment</code>: This variant helps represent a single metric or key
                    performance indicator (KPI) within a predefined range or target. In this variant, the segment sizes
                    are rendered as percentages.
                  </li>
                  <li>
                    <code>GaugeChartVariant.MultipleSegments</code>: This is the default variant that helps display the
                    distribution of a single variable across different thresholds or categories. In this variant, the
                    segment sizes are rendered as ranges.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        }
      />
    );
  }
}
