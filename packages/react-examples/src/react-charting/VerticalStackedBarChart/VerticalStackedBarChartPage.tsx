import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { VerticalStackedBarChartBasicExample } from './VerticalStackedBarChart.Basic.Example';
import { VerticalStackedBarChartStyledExample } from './VerticalStackedBarChart.Styled.Example';
import { VerticalStackedBarChartCalloutExample } from './VerticalStackedBarChart.Callout.Example';
import { VerticalStackedBarChartTooltipExample } from './VerticalStackedBarChart.AxisTooltip.Example';
import { VerticalStackedBarChartCustomAccessibilityExample } from './VerticalStackedBarChart.CustomAccessibility.Example';
import { VerticalStackedBarChartDateAxisExample } from './VerticalStackedBarChart.DateAxis.Example';
import { VerticalStackedBarChartReflowExample } from './VerticalStackedBarChart.Reflow.Example';
import { VerticalStackedBarChartSecondaryYAxisExample } from './VerticalStackedBarChart.SecondaryYAxis.Example';
import { VerticalStackedBarChartNegativeExample } from './VerticalStackedBarChart.Negative.Example';
import { VSBCAxisCategoryOrderExample } from './VerticalStackedBarChart.AxisCategoryOrder.Example';

const VerticalBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Styled.Example.tsx') as string;
const VerticalBarChartCalloutExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Callout.Example.tsx') as string;
const VerticalBarChartTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.AxisTooltip.Example') as string;
const VerticalBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.CustomAccessibility.Example') as string;
const VerticalBarChartDateAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.DateAxis.Example') as string;
const VerticalBarChartReflowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Reflow.Example.tsx') as string;
const VerticalBarChartSecondaryYAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.SecondaryYAxis.Example.tsx') as string;
const VerticalBarChartNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.Negative.Example.tsx') as string;
const VSBCAxisCategoryOrderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.AxisCategoryOrder.Example.tsx') as string;

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Vertical Stacked Bar Chart"
        componentName="VerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="VerticalStackedBarChart Reflow" code={VerticalBarChartReflowExampleCode}>
              <VerticalStackedBarChartReflowExample />
            </ExampleCard>
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
            <ExampleCard title="VerticalStackedBarChart Date Axis" code={VerticalBarChartDateAxisExampleCode}>
              <VerticalStackedBarChartDateAxisExample />
            </ExampleCard>
            <ExampleCard
              title="VerticalStackedBarChart secondary y-axis"
              code={VerticalBarChartSecondaryYAxisExampleCode}
            >
              <VerticalStackedBarChartSecondaryYAxisExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Negative" code={VerticalBarChartNegativeExampleCode}>
              <VerticalStackedBarChartNegativeExample />
            </ExampleCard>
            <ExampleCard title="VerticalStackedBarChart Axis Category Order" code={VSBCAxisCategoryOrderExampleCode}>
              <VSBCAxisCategoryOrderExample />
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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/docs/VerticalStackedBarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/docs/VerticalStackedBarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/docs/VerticalStackedBarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalStackedBarChart/docs/VerticalStackedBarChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
