import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';
import { HeatMapChartBasicExample } from './HeatMapChartBasic.Example';
import { HeatMapChartCustomAccessibilityExample } from './HeatMapChartBasic.CustomAccessibility.Example';
import { HeatMapChartPiecewiseScaleExample } from './HeatMapChart.PiecewiseScale.Example';

const HeatMapChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.Example.tsx');
const HeatMapChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.CustomAccessibility.Example.tsx');
const HeatMapChartPiecewiseScaleExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChart.PiecewiseScale.Example.tsx');

export class HeatMapChart extends React.Component<IComponentDemoPageProps, {}> {
  public render(): React.ReactNode {
    return (
      <ComponentPage
        title="Heat Map Chart"
        componentName="HeatMapChartExample"
        exampleCards={
          <div>
            <ExampleCard title="Heat Map Basic" code={HeatMapChartBasicExampleCode}>
              <HeatMapChartBasicExample />
            </ExampleCard>
            <ExampleCard title="Heat Map Custom Accessibility" code={HeatMapChartCustomAccessibilityExampleCode}>
              <HeatMapChartCustomAccessibilityExample />
            </ExampleCard>
            <ExampleCard title="Heat Map Piecewise Scale" code={HeatMapChartPiecewiseScaleExampleCode}>
              <HeatMapChartPiecewiseScaleExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/HeatMapChart/HeatMapChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
