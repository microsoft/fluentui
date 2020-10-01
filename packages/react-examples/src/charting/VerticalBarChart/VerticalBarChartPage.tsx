import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';

const VerticalBarChartBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/VerticalBarChart/VerticalBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/VerticalBarChart/VerticalBarChart.Styled.Example.tsx') as string;
const VerticalBarChartDynamicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/VerticalBarChart/VerticalBarChart.Dynamic.Example.tsx') as string;

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="VerticalBarChart"
        componentName="VerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="VerticalBarChart basic" code={VerticalBarChartBasicExampleCode}>
              <VerticalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart styled" code={VerticalBarChartStyledExampleCode}>
              <VerticalBarChartStyledExample />
            </ExampleCard>
            <ExampleCard title="VerticalBarChart dynamic" code={VerticalBarChartDynamicExampleCode}>
              <VerticalBarChartDynamicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/charting/src/components/VerticalBarChart/VerticalBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
