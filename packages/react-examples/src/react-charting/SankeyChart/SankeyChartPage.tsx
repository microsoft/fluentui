import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  Markdown,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';
import { SankeyChartInboxExample } from './SankeyChart.Inbox.Example';
import { SankeyChartRebalanceExample } from './SankeyChart.Rebalance.Example';

const SankeyChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Basic.Example.tsx') as string;
const SankeyChartInboxExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Inbox.Example.tsx') as string;
const SankeyChartRebalanceExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Rebalance.Example.tsx') as string;

export class SankeyChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Sankey Chart"
        componentName="SankeyChartExample"
        exampleCards={
          <div>
            <ExampleCard title="SankeyChart basic" code={SankeyChartBasicExampleCode}>
              <SankeyChartBasicExample />
            </ExampleCard>
            <ExampleCard title="SankeyChart Inbox" code={SankeyChartInboxExampleCode}>
              <SankeyChartInboxExample />
            </ExampleCard>
            <ExampleCard title="SankeyChart Rebalance" code={SankeyChartRebalanceExampleCode}>
              <SankeyChartRebalanceExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/SankeyChart/SankeyChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
