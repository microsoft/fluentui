import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { ScatterChartBasicExample } from './ScatterChart.Basic.Example';
import { ScatterChartDateExample } from './ScatterChart.DateAxis.Example';
import { ScatterChartStringExample } from './ScatterChart.StringAxis.Example';
import { ScatterChartLogAxisExample } from './ScatterChart.LogAxis.Example';

const ScatterChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.Basic.Example.tsx') as string;
const ScatterChartDateExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.DateAxis.Example.tsx') as string;
const ScatterChartStringExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.StringAxis.Example.tsx') as string;
const ScatterChartLogAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.LogAxis.Example.tsx') as string;
// All Scatter charts locale is impacted.

export class ScatterChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Scatter Chart"
        componentName="ScatterChartExample"
        exampleCards={
          <div>
            <ExampleCard title="ScatterChart basic" code={ScatterChartBasicExampleCode}>
              <ScatterChartBasicExample />
            </ExampleCard>
            <ExampleCard title="ScatterChart date" code={ScatterChartDateExampleCode}>
              <ScatterChartDateExample />
            </ExampleCard>
            <ExampleCard title="ScatterChart string" code={ScatterChartStringExampleCode}>
              <ScatterChartStringExample />
            </ExampleCard>
            <ExampleCard title="ScatterChart log axis" code={ScatterChartLogAxisExampleCode}>
              <ScatterChartLogAxisExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/ScatterChart/ScatterChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
