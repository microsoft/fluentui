import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, Markdown } from '@fluentui/react-docsite-components';

import { DeclarativeChartBasicExample } from './DeclarativeChart.Basic.Example';

const DeclarativeChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/DeclarativeChart.Basic.Example.tsx') as string;

export class DeclarativeChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Declarative Chart"
        componentName="DeclarativeChartExample"
        exampleCards={
          <div>
            <ExampleCard title="DeclarativeChart basic" code={DeclarativeChartBasicExampleCode}>
              <DeclarativeChartBasicExample />
            </ExampleCard>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
