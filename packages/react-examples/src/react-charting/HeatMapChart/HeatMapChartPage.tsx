import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';
import { HeatMapChartBasicExample } from './HeatMapChartBasic.Example';
import { HeatMapChartCustomAccessibilityExample } from './HeatMapChartBasic.CustomAccessibility.Example';

const HeatMapChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.Example.tsx');
const HeatMapChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.CustomAccessibility.Example.tsx');

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
          <div>
            <p>
              Heat Map Chart is a two-dimensional visual representation of data, where values are encoded in colors,
              delivering a convenient, insightful view of information. Essentially, this chart type is a data table with
              rows and columns denoting different sets of categories. Each cell in the table can contain a numerical or
              logical value that determines the cell color based on a given color palette.
            </p>
            <h4>Defining Color scale</h4>
            <p>
              The color palette for a heat map chart is defined by a domain/range combination. The domain consists of
              values in the chart columns. It is an array of numbers. See <code>domainValuesForColorScale</code>. The
              range is an array <code>rangeValuesForColorScale</code> of colors in hex format. The graph creates a
              mapping between each value from domain to range. For all values in the domain, an equivalent interpolation
              is drawn in the range of color scale. For eg: if the domain is [0,500,900] and range is [green, blue,
              red], then [0, 500] is mapped in the range [green, blue] and [500, 900] in the range [blue, red],
            </p>
            <h4>Data formatting</h4>
            <p>Use the following formatters based on the type of axis.</p>
            <p>
              For date x axis use: <code>xAxisDateFormatString</code>
            </p>
            <p>
              For date y axis use: <code>yAxisDateFormatString</code>
            </p>
            <p>
              For numeric x axis use: <code>xAxisNumberFormatString</code>
            </p>
            <p>
              For numeric y axis use: <code>yAxisNumberFormatString</code>
            </p>
            <p>
              For string x axis use: <code>xAxisStringFormatter</code>
            </p>
            <p>
              For string y axis use: <code>yAxisStringFormatter</code>
            </p>
          </div>
        }
      />
    );
  }
}
