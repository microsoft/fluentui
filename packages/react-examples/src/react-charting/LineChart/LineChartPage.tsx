import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { LineChartBasicExample } from './LineChart.Basic.Example';
import { LineChartStyledExample } from './LineChart.Styled.Example';
import { LineChartMultipleExample } from './LineChart.Multiple.Example';
import { LineChartEventsExample } from './LineChart.Events.Example';
import { LineChartCustomAccessibilityExample } from './LineChart.CustomAccessibility.Example';
import { LineChartGapsExample } from './LineChart.Gaps.Example';
import { LineChartLargeDataExample } from './LineChart.LargeData.Example';
import { LineChartCustomLocaleDateAxisExample } from './LineChart.CustomLocaleDateAxis.Example';

const LineChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Basic.Example.tsx') as string;
const LineChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Styled.Example.tsx') as string;
const MultipleLineChartExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Multiple.Example.tsx') as string;
const LineChartEventsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Events.Example.tsx') as string;
const LineChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomAccessibility.Example.tsx') as string;
const LineChartGapsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Gaps.Example.tsx') as string;
const LineChartLargeDataExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.LargeData.Example.tsx') as string;
const LineChartCustomLocaleDateAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomLocaleDateAxis.Example.tsx') as string;

// All line charts locale is impacted.

export class LineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Line Chart"
        componentName="LineChartExample"
        exampleCards={
          <div>
            <ExampleCard title="LineChart basic" code={LineChartBasicExampleCode}>
              <LineChartBasicExample />
            </ExampleCard>
            <ExampleCard title="LineChart styled" code={LineChartStyledExampleCode}>
              <LineChartStyledExample />
            </ExampleCard>
            <ExampleCard title="Multiple Line chart" code={MultipleLineChartExampleCode}>
              <LineChartMultipleExample />
            </ExampleCard>
            <ExampleCard title="LineChart with events" code={LineChartEventsExampleCode}>
              <LineChartEventsExample />
            </ExampleCard>
            <ExampleCard title="LineChart Custom Accessibility" code={LineChartCustomAccessibilityExampleCode}>
              <LineChartCustomAccessibilityExample />
            </ExampleCard>
            <ExampleCard title="LineChart with gaps" code={LineChartGapsExampleCode}>
              <LineChartGapsExample />
            </ExampleCard>
            <ExampleCard title="LineChart large data" code={LineChartLargeDataExampleCode}>
              <LineChartLargeDataExample />
            </ExampleCard>
            <ExampleCard title="LineChart custom date axis locale" code={LineChartCustomLocaleDateAxisExampleCode}>
              <LineChartCustomLocaleDateAxisExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/LineChart/LineChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
