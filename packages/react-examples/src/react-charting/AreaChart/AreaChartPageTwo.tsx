import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { AreaChartPerfTwoExample } from './AreaChart.PerfAnalysisTwo.Example';

const AreaChartPerfTwoExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.PerfAnalysisTwo.Example.tsx') as string;

export class AreaChartTwo extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Area Chart Page One"
        componentName="AreaChartPerformanceExampleOne"
        exampleCards={
          <div>
            <ExampleCard title="Area chart Perf Analysis Data" code={AreaChartPerfTwoExampleCode}>
              <AreaChartPerfTwoExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/AreaChart/AreaChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
