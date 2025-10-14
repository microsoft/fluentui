import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { SparklineChartBasicExample } from './SparklineChart.Basic.Example';
import type { JSXElement } from '@fluentui/utilities';

const SparklineChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/SparklineChart.Basic.Example.tsx') as string;

export class SparklineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSXElement {
    return (
      <ComponentPage
        title="Sparkline Chart"
        componentName="SparklineChartExample"
        exampleCards={
          <div>
            <ExampleCard title="SparklineChart basic" code={SparklineChartBasicExampleCode}>
              <SparklineChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/Sparkline/Sparkline.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
