import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
