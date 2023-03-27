import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SparklineChartBasicExample } from './SparklineChart.Basic.Example';

const SparklineChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/SparklineChart.Basic.Example.tsx') as string;

export class SparklineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
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
          <div>
            <p>
              A sparkline is a very small area chart without axes or coordinates, usually representing trend over time.
              When used as a component in lists, the sparkline is paired with a numeric value that summarizes or
              provides the most current value of the chart.
            </p>
          </div>
        }
      />
    );
  }
}
