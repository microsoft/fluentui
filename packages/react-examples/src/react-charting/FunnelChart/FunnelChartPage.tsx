import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { FunnelChartBasicExample } from './FunnelChart.Basic.Example';
import { FunnelChartStackedExample } from './FunnelChart.Stacked.Example';

const FunnelChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/FunnelChart.Basic.Example.tsx') as string;

const FunnelChartStackedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/FunnelChart.Stacked.Example.tsx') as string;

export class FunnelChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Funnel Chart"
        componentName="FunnelChartExample"
        exampleCards={
          <div>
            <ExampleCard title="FunnelChart basic" code={FunnelChartBasicExampleCode}>
              <FunnelChartBasicExample />
            </ExampleCard>
            <ExampleCard title="FunnelChart stacked" code={FunnelChartStackedExampleCode}>
              <FunnelChartStackedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/FunnelChart/FunnelChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
