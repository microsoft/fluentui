import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { HeatMapChartBasicExample } from './HeatMapChartBasic.Example';

const HeatMapChartBasicExampleCode = require('!raw-loader!@fluentui/examples/src/charting/HeatMapChart/HeatMapChartBasic.Example.tsx');

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
