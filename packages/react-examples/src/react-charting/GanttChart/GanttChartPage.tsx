import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { GanttChartBasicExample } from './GanttChart.Basic.Example';
import { GanttChartGroupedExample } from './GanttChart.Grouped.Example';

const GanttChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/GanttChart.Basic.Example.tsx') as string;
const GanttChartGroupedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/GanttChart.Grouped.Example.tsx') as string;

export class GanttChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Gantt Chart"
        componentName="GanttChart"
        exampleCards={
          <div>
            <ExampleCard title="GanttChart basic" code={GanttChartBasicExampleCode}>
              <GanttChartBasicExample />
            </ExampleCard>
            <ExampleCard title="GanttChart grouped" code={GanttChartGroupedExampleCode}>
              <GanttChartGroupedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/GanttChart/GanttChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
