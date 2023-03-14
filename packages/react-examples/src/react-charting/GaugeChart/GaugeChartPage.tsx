import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { GaugeChartBasicExample } from './GaugeChart.Basic.Example';

const GaugeChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.Basic.Example.tsx') as string;

export class GaugeChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Gauge Chart"
        componentName="GaugeChartExample"
        exampleCards={
          <div>
            <ExampleCard title="GaugeChart basic" code={GaugeChartBasicExampleCode}>
              <GaugeChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/GaugeChart/GaugeChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
