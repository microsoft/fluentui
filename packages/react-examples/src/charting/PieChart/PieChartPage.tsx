import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { PieChartBasicExample } from './PieChart.Basic.Example';
import { PieChartDynamicExample } from './PieChart.Dynamic.Example';

const PieChartBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/PieChart/PieChart.Basic.Example.tsx') as string;
const PieChartDynamicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/PieChart/PieChart.Dynamic.Example.tsx') as string;

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
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/PieChart/PieChart.types.ts')]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
