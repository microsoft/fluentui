import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { GroupedVerticalBarChartBasicExample } from './GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartBasic2Example } from './GroupedVerticalBarChart.Basic2.Example';
import { GroupedVerticalBarChartStyledExample } from './GroupedVerticalBarChart.Styled.Example';

const GroupedVerticalBasicExampleCode = require('!raw-loader!@fluentui/examples/src/charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Basic.Example.tsx') as string;
const GroupedVerticalStyledExampleCode = require('!raw-loader!@fluentui/examples/src/charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Styled.Example.tsx') as string;
const GroupedVerticalBasic2ExampleCode = require('!raw-loader!@fluentui/examples/src/charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Basic2.Example.tsx') as string;

export class GroupedVerticalBarChart extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Grouped Vertical Bar Chart"
        componentName="GroupedVerticalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="Grouped Vertical Bar Chart basic" code={GroupedVerticalBasicExampleCode}>
              <GroupedVerticalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="Grouped Vertical Bar Chart basic 2" code={GroupedVerticalBasic2ExampleCode}>
              <GroupedVerticalBarChartBasic2Example />
            </ExampleCard>
            <ExampleCard title="Grouped Vertical Bar Chart Styled" code={GroupedVerticalStyledExampleCode}>
              <GroupedVerticalBarChartStyledExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/charting/src/components/VerticalStackedBarChart/VerticalStackedBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
