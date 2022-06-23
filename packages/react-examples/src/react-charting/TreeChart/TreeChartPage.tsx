import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { TreeChartBasicExample } from './TreeChart.Basic.Example';

const TreeChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.Basic.Example.tsx') as string;

export class TreeChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Tree Chart"
        componentName="TreeChartExample"
        exampleCards={
          <div>
            <ExampleCard title="TreeChart Two-Layer" code={TreeChartBasicExampleCode}>
              <TreeChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/Tree/TreeChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>Tree chart</p>
          </div>
        }
      />
    );
  }
}
