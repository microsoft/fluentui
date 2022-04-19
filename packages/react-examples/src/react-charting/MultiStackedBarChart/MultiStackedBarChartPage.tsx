import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { MultiStackedBarChartExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';

const MultiStackedBarChartExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChart.Example.tsx') as string;
const MultiStackedBarChartWithPlaceholderExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChartWithPlaceHolder.Example.tsx') as string;

export class MultiStackedBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Multiple Stacked Bar Chart"
        componentName="MultiStackedBarChart"
        exampleCards={
          <>
            <ExampleCard title="Multi Stacked Bar Chart" code={MultiStackedBarChartExampleCode}>
              <MultiStackedBarChartExample />
            </ExampleCard>
            <ExampleCard
              title="Multi Stacked Bar Chart With Placeholder"
              code={MultiStackedBarChartWithPlaceholderExampleCode}
            >
              <MultiStackedBarChartWithPlaceholderExample />
            </ExampleCard>
          </>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/StackedBarChart/MultiStackedBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              StackedBarChart shows the data in a bar format. It has two variations: single stacked and multi-stacked.
              Below are a few points that will help you understand the stacked bar chart better:
            </p>
            <ul>
              <li>The stacked bar chart comes with a legends component built in.</li>
              <li>Single stacked bar chart takes 'data' attribute which is of type IChartDataPoint[]</li>
              <li>
                Multi-stacked bar chart takes 'data' attribute which is of type IChartDataPoint[][]. It will render the
                chart based upon the values given to this attribute.
              </li>
              <li>
                Ratio on top of the chart is shown if it has only two data points. For the rest of cases the ratio is
                not shown
              </li>
              <li>
                A number is displayed on the top of stacked bar chart if it has only one data point. This number shown
                is the data you pass
              </li>
              <li>
                MultiStackedBarChart has a option 'showRatio' this will help you hide the ratio for the chart. It is a
                boolean[], you can use the values to control displaying ratio for each chart in MultiStackedBarChart.
              </li>
              <li>
                If a chart in MultiStackedBarChart shows ratio, legends are not displayed for that chart and vice-versa.
              </li>
            </ul>
          </div>
        }
      />
    );
  }
}
