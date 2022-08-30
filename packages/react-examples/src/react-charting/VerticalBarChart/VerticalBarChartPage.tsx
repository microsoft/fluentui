import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';
import { VerticalBarChartTooltipExample } from './VerticalBarChart.AxisTooltip.Example';
import { VerticalBarChartCustomAccessibilityExample } from './VerticalBarChart.CustomAccessibility.Example';
import { VerticalBarChartRotatedLabelExample } from './VerticalBarChart.RotateLabels.Example';

const VerticalBarChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Styled.Example.tsx') as string;
const VerticalBarChartDynamicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Dynamic.Example.tsx') as string;
const VerticalBarChartTooltipExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.AxisTooltip.Example.tsx') as string;
const VerticalBarChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.CustomAccessibility.Example.tsx') as string;
const VerticalBarChartRotateLabelsExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.RotateLabels.Example.tsx') as string;

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Vertical Bar Chart"
        componentName="VerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="VerticalBarChart basic" code={VerticalBarChartBasicExampleCode}>
              <VerticalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart styled" code={VerticalBarChartStyledExampleCode}>
              <VerticalBarChartStyledExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart dynamic" code={VerticalBarChartDynamicExampleCode}>
              <VerticalBarChartDynamicExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart dynamic" code={VerticalBarChartTooltipExampleCode}>
              <VerticalBarChartTooltipExample />
            </ExampleCard>
            <ExampleCard
              title="VerticalBarChart Custom Accessibility"
              code={VerticalBarChartCustomAccessibilityExampleCode}
            >
              <VerticalBarChartCustomAccessibilityExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart rotate label" code={VerticalBarChartRotateLabelsExampleCode}>
              <VerticalBarChartRotatedLabelExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/VerticalBarChart/VerticalBarChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              A vertical bar chart is used to show comparisons between categories of data, usually over a period of
              time. Categories and time are typically shown along the horizontal axis, while the data values are shown
              along the vertical axis.
            </p>
            <p>
              The bar widths are proportional to the number of bars and space available within the charting area. The
              bar width can be changed using the <code>barWidth</code> property.
            </p>
            <br />
            <h3>Implementation details</h3>
            <p>
              The current vertical bar charts implementation is in the cartesian coordinate system. The cartesian
              coordinate system is represented by Cartesian Chart which serves as the base class for vertical bar charts
            </p>
            <p>
              The chart provides an option to select a color scale based on the range of y values. Similar y values will
              end up having similar color. Use the <code>colors</code> attribute to define the color scale.
            </p>
            <p>
              Use <code>useSingleColor</code> to use a single color for all bars.
            </p>
            <p>
              Use <code>lineLegendText and lineLegendColor</code> to specify the text and color for legends of lines in
              the chart.
            </p>
          </div>
        }
      />
    );
  }
}
