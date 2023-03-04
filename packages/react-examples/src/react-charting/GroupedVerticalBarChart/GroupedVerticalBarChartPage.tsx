import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { GroupedVerticalBarChartBasicExample } from './GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartTruncatedExample } from './GroupedVerticalBarChart.Truncated.Example';
import { GroupedVerticalBarChartStyledExample } from './GroupedVerticalBarChart.Styled.Example';
import { GroupedVerticalBarChartCustomAccessibilityExample } from './GroupedVerticalBarChart.CustomAccessibility.Example';

const GroupedVerticalBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Basic.Example.tsx') as string;
const GroupedVerticalStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Styled.Example.tsx') as string;
const GroupedVerticalTruncatedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Truncated.Example.tsx') as string;
const GroupedVerticalCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.CustomAccessibility.Example.tsx') as string;

export class GroupedVerticalBarChart extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Grouped Vertical Bar Chart"
        componentName="GroupedVerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="Grouped Vertical Bar Chart Basic" code={GroupedVerticalBasicExampleCode}>
              <GroupedVerticalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="Grouped Vertical Bar Chart Truncated" code={GroupedVerticalTruncatedExampleCode}>
              <GroupedVerticalBarChartTruncatedExample />
            </ExampleCard>
            <ExampleCard title="Grouped Vertical Bar Chart Styled" code={GroupedVerticalStyledExampleCode}>
              <GroupedVerticalBarChartStyledExample />
            </ExampleCard>
            <ExampleCard
              title="Grouped Vertical Bar Chart Custom Accessibility"
              code={GroupedVerticalCustomAccessibilityExampleCode}
            >
              <GroupedVerticalBarChartCustomAccessibilityExample />
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
              Grouped vertical bar chart is slightly different than a vertical stacked bar chart. In a vertical stacked
              bar chart, the bars are stacked one on top of the other. In a grouped vertical bar chart, the vertical
              bars are aligned next to each other in groups. In stacked bar chart, the reference point for each bar is
              either the x axis or another bar in the stack. For grouped vertical bar chart, each bar has x axis as the
              reference point. Having a common reference point helps in better comparison between different values in
              the chart.
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
