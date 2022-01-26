import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { PieChartBasicExample } from './PieChart.Basic.Example';
import { PieChartDynamicExample } from './PieChart.Dynamic.Example';

const PieChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/PieChart.Basic.Example.tsx') as string;
const PieChartDynamicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/PieChart.Dynamic.Example.tsx') as string;

export class PieChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="PieChart"
        componentName="PieChartExample"
        exampleCards={
          <div>
            <ExampleCard title="PieChart basic" code={PieChartBasicExampleCode}>
              <PieChartBasicExample />
            </ExampleCard>
            <ExampleCard title="PieChart dynamic" code={PieChartDynamicExampleCode}>
              <PieChartDynamicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/PieChart/PieChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
