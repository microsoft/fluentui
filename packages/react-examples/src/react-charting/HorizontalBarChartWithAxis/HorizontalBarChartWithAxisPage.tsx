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

const HorizontalBarChartWithAxisBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Basic.Example.tsx') as string;
const HorizontalBarChartWithAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisStringAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.StringAxisTooltip.Example.tsx') as string;

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
