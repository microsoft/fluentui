import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { DonutChartBasicExample } from './DonutChart.Basic.Example';
import { DonutChartDynamicExample } from './DonutChart.Dynamic.Example';
import { DonutChartCustomCalloutExample } from './DonutChart.CustomCallout.Example';

const DonutChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Basic.Example.tsx') as string;
const DonutChartDynamicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Dynamic.Example.tsx') as string;
const DonutChartCustomCalloutExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.CustomCallout.Example.tsx') as string;

export class DonutChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="DonutChart"
        componentName="DonutChartExample"
        exampleCards={
          <div>
            <ExampleCard title="DonutChart basic" code={DonutChartBasicExampleCode}>
              <DonutChartBasicExample />
            </ExampleCard>
            <ExampleCard title="DonutChart dynamic" code={DonutChartDynamicExampleCode}>
              <DonutChartDynamicExample />
            </ExampleCard>
            <ExampleCard title="DonutChart Custom Callout" code={DonutChartCustomCalloutExampleCode}>
              <DonutChartCustomCalloutExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/DonutChart/DonutChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
