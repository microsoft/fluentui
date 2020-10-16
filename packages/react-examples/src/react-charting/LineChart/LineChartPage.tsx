import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { LineChartBasicExample } from './LineChart.Basic.Example';
import { LineChartStyledExample } from './LineChart.Styled.Example';
import { LineChartMultipleExample } from './LineChart.Multiple.Example';
import { LineChartEventsExample } from './LineChart.Events.Example';

const LineChartBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/LineChart/LineChart.Basic.Example.tsx') as string;
const LineChartStyledExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/LineChart/LineChart.Styled.Example.tsx') as string;
const MultipleLineChartExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/LineChart/LineChart.Multiple.Example.tsx') as string;
const LineChartEventsExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/LineChart/LineChart.Events.Example.tsx') as string;

export class LineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="LineChart"
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
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/LineChart/LineChart.types.ts')]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
