import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SparklineChartBasicExample } from './SparklineChart.Basic.Example';

const SparklineChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/SparklineChart.Basic.Example.tsx') as string;

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
            <p>Sparkline chart</p>
          </div>
        }
      />
    );
  }
}
