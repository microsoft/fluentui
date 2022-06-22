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
import { DonutChartCustomAccessibilityExample } from './DonutChart.CustomAccessibility.Example';

const DonutChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Basic.Example.tsx') as string;
const DonutChartDynamicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Dynamic.Example.tsx') as string;
const DonutChartCustomCalloutExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.CustomCallout.Example.tsx') as string;
const DonutChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.CustomAccessibility.Example.tsx') as string;

export class DonutChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Donut Chart"
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
            <ExampleCard title="DonutChart Custom Accessibility" code={DonutChartCustomAccessibilityExampleCode}>
              <DonutChartCustomAccessibilityExample />
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
        overview={
          <div>
            <p>
              Donut charts show a percentage of a whole. They are circular statistical graphics divided into slices to
              illustrate numerical proportion. Donut charts have an empty center where a numerical value can be shown.
            </p>
            <p>
              The arc length of each data set in a donut is proportional to the quantity it represents, which can also
              be expressed as a horizontal bar chart.
            </p>
            <p>
              <strong>Note:</strong> Donut Charts typically represent two data points. Representing more data in a
              circular chart (as seen in the second example) is known by the MADS team as a Pie Chart.
            </p>
          </div>
        }
      />
    );
  }
}
