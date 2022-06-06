import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';

const SankeyChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Basic.Example.tsx') as string;

export class SankeyChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Sankey Chart"
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
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/SankeyChart/SankeyChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              A sankey diagram is a visualization used to depict a flow from one set of values to another. The things
              being connected are called nodes and the connections are called links. Sankeys are best used when you want
              to show a many-to-many mapping between two domains (e.g., universities and majors) or multiple paths
              through a set of stages
            </p>
          </div>
        }
      />
    );
  }
}
