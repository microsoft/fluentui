import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';
import { HorizontalBarChartWithAxisDynamicExample } from './HorizontalBarChartWithAxis.Dynamic.Example';
import { HorizontalBarChartWithAxisNegativeExample } from './HorizontalBarChartWithAxis.Negative.Example';
import { HBWAAxisCategoryOrderExample } from './HorizontalBarChartWithAxis.AxisCategoryOrder.Example';

const HorizontalBarChartWithAxisBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Basic.Example.tsx') as string;
const HorizontalBarChartWithAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisStringAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.StringAxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Dynamic.Example.tsx') as string;
const HorizontalBarChartWithAxisNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Negative.Example.tsx') as string;
const HBWAAxisCategoryOrderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisCategoryOrder.Example.tsx') as string;

export class HorizontalBarChartWithAxisPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Horizontal Bar Chart With Axis"
        componentName="HorizontalBarChartWithAxisExample"
        exampleCards={
          <div>
            <ExampleCard title="HorizontalBarChartWithAxis basic" code={HorizontalBarChartWithAxisBasicExampleCode}>
              <HorizontalBarChartWithAxisBasicExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis Tooltip Callout"
              code={HorizontalBarChartWithAxisTooltipExampleCode}
            >
              <HorizontalBarChartWithAxisTooltipExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis with String Y Axis And Tooltip"
              code={HorizontalBarChartWithAxisStringAxisTooltipExampleCode}
            >
              <HorizontalBarChartWithAxisStringAxisTooltipExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis with Dynamic Y Axis"
              code={HorizontalBarChartWithAxisDynamicExampleCode}
            >
              <HorizontalBarChartWithAxisDynamicExample />
            </ExampleCard>
            <ExampleCard
              title="HorizontalBarChartWithAxis with Negative X Axis"
              code={HorizontalBarChartWithAxisNegativeExampleCode}
            >
              <HorizontalBarChartWithAxisNegativeExample />
            </ExampleCard>
            <ExampleCard title="HorizontalBarChartWithAxis Axis Category Order" code={HBWAAxisCategoryOrderExampleCode}>
              <HBWAAxisCategoryOrderExample />
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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
