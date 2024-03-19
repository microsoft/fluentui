import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';
import { VerticalBarChartTooltipExample } from './VerticalBarChart.AxisTooltip.Example';
import { VerticalBarChartCustomAccessibilityExample } from './VerticalBarChart.CustomAccessibility.Example';
import { VerticalBarChartRotatedLabelExample } from './VerticalBarChart.RotateLabels.Example';
import { VerticalBarChartDateAxisExample } from './VerticalBarChart.DateAxis.Example';

const VerticalBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Styled.Example.tsx') as string;
const VerticalBarChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Dynamic.Example.tsx') as string;
const VerticalBarChartTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.AxisTooltip.Example.tsx') as string;
const VerticalBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.CustomAccessibility.Example.tsx') as string;
const VerticalBarChartRotateLabelsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.RotateLabels.Example.tsx') as string;
const VerticalBarChartDateAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.DateAxis.Example.tsx') as string;

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
            <ExampleCard title="VerticalBarChart Date Axis" code={VerticalBarChartDateAxisExampleCode}>
              <VerticalBarChartDateAxisExample />
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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
