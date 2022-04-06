import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { LineChartBasicExample } from './LineChart.Basic.Example';
import { LineChartStyledExample } from './LineChart.Styled.Example';
import { LineChartMultipleExample } from './LineChart.Multiple.Example';
import { LineChartEventsExample } from './LineChart.Events.Example';
import { LineChartCustomAccessibilityExample } from './LineChart.CustomAccessibility.Example';

const LineChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Basic.Example.tsx') as string;
const LineChartStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Styled.Example.tsx') as string;
const MultipleLineChartExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Multiple.Example.tsx') as string;
const LineChartEventsExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Events.Example.tsx') as string;
const LineChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomAccessibility.Example.tsx') as string;

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
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/LineChart/LineChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Use a line graph to visualize data sets over a period of time for an individual or group of items. The
              amount of lines (data sets) depend on the attributes selected during the report creation.
            </p>
            <p>The line graph thickness will vary depending on the number of data sets and data increments.</p>
          </div>
        }
      />
    );
  }
}
