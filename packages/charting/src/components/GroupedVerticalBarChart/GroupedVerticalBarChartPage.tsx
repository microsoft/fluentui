import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { GroupedVerticalBarChartBasicExample } from './examples/GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartStyledExample } from './examples/GroupedVerticalBarChart.Styled.Example';

// tslint:disable-next-line: max-line-length
const GroupedVerticalBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/GroupedVericalBarChart/examples/GroupedVeritcalBarChart.Basic.Example.tsx') as string;
// tslint:disable-next-line: max-line-length
const GroupedVerticalStyledExampleCode = require('!raw-loader!@uifabric/charting/src/components/GroupedVericalBarChart/examples/GroupedVeritcalBarChart.Styled.Example.tsx') as string;

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
                // tslint:disable-next-line: max-line-length
              >('!raw-loader!@uifabric/charting/src/components/VerticalStackedBarChart/VerticalStackedBarChart.types.ts'),
            ]}
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>Grouped Vertical bar chart description</p>
          </div>
        }
        /* tslint:enable:max-line-length */
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
