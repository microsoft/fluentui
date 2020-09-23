import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { HeatMapChartBasicExample } from './examples/HeatMapChartBasic.example';

const HeatMapChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/HeatMapChart/examples/HeatMapChartBasic.example.tsx');

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
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/charting/src/components/HeatMapChart/HeatMapChart.types.ts'),
            ]}
          />
        }
      />
    );
  }
}
