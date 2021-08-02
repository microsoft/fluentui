import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';

const SankeyChartBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/charting/SankeyChart/SankeyChart.Basic.Example.tsx') as string;

export class PieChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SankeyChart"
        componentName="SankeyChartExample"
        exampleCards={
          <div>
            <ExampleCard title="SankeyChart basic" code={SankeyChartBasicExampleCode}>
              <SankeyChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@fluentui/react-examples/src/charting/SankeyChart/SankeyChart.Basic.Example.tsx'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
