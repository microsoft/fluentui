import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { VerticalStackedBarChartBasicExample } from './VerticalStackedBarChart.Basic.Example';
import { VerticalStackedBarChartStyledExample } from './VerticalStackedBarChart.Styled.Example';
import { VerticalStackedBarChartCalloutExample } from './VerticalStackedBarChart.Callout.Example';
import { VerticalStackedBarChartTooltipExample } from './VerticalStackedBarChart.AxisTooltip.Example';
import { VerticalStackedBarChartCustomAccessibilityExample } from './VerticalStackedBarChart.CustomAccessibility.Example';

const VerticalBarChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Styled.Example.tsx') as string;
const VerticalBarChartCalloutExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Callout.Example.tsx') as string;
const VerticalBarChartTooltipExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.AxisTooltip.Example') as string;
const VerticalBarChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.CustomAccessibility.Example') as string;

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Vertical Stacked Bar Chart"
        componentName="VerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="VerticalStackedBarChart basic" code={VerticalBarChartBasicExampleCode}>
              <VerticalStackedBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Styled" code={VerticalBarChartStyledExampleCode}>
              <VerticalStackedBarChartStyledExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Callout" code={VerticalBarChartCalloutExampleCode}>
              <VerticalStackedBarChartCalloutExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Callout" code={VerticalBarChartTooltipExampleCode}>
              <VerticalStackedBarChartTooltipExample />
            </ExampleCard>
            <ExampleCard
              title="VerticalStackedBarChart Custom Accessibility"
              code={VerticalBarChartCustomAccessibilityExampleCode}
            >
              <VerticalStackedBarChartCustomAccessibilityExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/VerticalStackedBarChart/VerticalStackedBarChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Vertical stacked bar chart shows comparsions between categories of data, but with the ability to break
              down and compare parts of a whole. Each bar in the chart represents a whole, and sections within the bar
              represents different parts or categories of that whole
            </p>
            <p>
              <code>bargapmax</code> sets the maximum gap between bars in a stack. See the prop for more details.
            </p>
            <p>
              <code>barCornerRadius</code> sets the corner radius of the bars
            </p>
            <p>
              <code>barMinimumHeight</code> provides the minimum height of a bar. Bars below this height will be
              displayed at this height.
            </p>
            <p>
              Use <code>isCalloutForStack</code> to configure callout to be at stack level or individual datapoint level
            </p>
            <p>
              Define a custom callout rendered per datapoint using <code>onRenderCalloutPerDataPoint</code> and per
              stack using <code>onRenderCalloutPerStack</code>
            </p>
            <p>
              Use <code>onBarClick</code> handler for callback on click of bars
            </p>
            <p>
              The bar labels are shown by default. Set the <code>hideLabels</code> prop to hide them.
            </p>
          </div>
        }
      />
    );
  }
}
