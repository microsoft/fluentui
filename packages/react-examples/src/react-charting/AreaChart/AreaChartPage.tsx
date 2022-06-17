import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { AreaChartBasicExample } from './AreaChart.Basic.Example';
import { AreaChartMultipleExample } from './AreaChart.Multiple.Example';
import { AreaChartStyledExample } from './AreaChart.Styled.Example';
import { AreaChartCustomAccessibilityExample } from './AreaChart.CustomAccessibility.Example';

const AreaChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Basic.Example.tsx') as string;
const AreaChartMultipleExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Multiple.Example.tsx') as string;
const AreaChartStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Styled.Example.tsx') as string;
const AreaChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.CustomAccessibility.Example.tsx') as string;

export class AreaChart extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Area Chart"
        componentName="AreaChartBasicExample"
        exampleCards={
          <div>
            <ExampleCard title="Area Chart basic" code={AreaChartBasicExampleCode}>
              <AreaChartBasicExample />
            </ExampleCard>
            <ExampleCard title="Multiple Area chart" code={AreaChartMultipleExampleCode}>
              <AreaChartMultipleExample />
            </ExampleCard>
            <ExampleCard title="Styled Area chart" code={AreaChartStyledExampleCode}>
              <AreaChartStyledExample />
            </ExampleCard>
            <ExampleCard title="Area chart custom Accessibility" code={AreaChartCustomAccessibilityExampleCode}>
              <AreaChartCustomAccessibilityExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/AreaChart/AreaChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Area charts depict a time-series relationship. But unlike line charts, they can also visually represent
              volume. Information is graphed on two axes, using data points connected by line segments. The area between
              the axis and this line is commonly emphasized with color or shading for legibility. Most often area charts
              compare two or more categories.
            </p>
          </div>
        }
      />
    );
  }
}
