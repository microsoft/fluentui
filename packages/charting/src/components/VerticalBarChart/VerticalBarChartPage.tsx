import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { VerticalBarChartBasicExample } from './examples/VerticalBarChart.Basic.Example';

// TODO this causes npm start error Module not found: Error: Can't resolve
// const VerticalBarChartBasicExampleCode = require(
//   '!raw-loader!@uifabric/charting/src/components/VerticalBarChart/examples/VerticalBarChart.Basic.Example.tsx'
// ) as string;
const VerticalBarChartBasicExampleCode = '';

export class VerticalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='VerticalBarChart'
        componentName='VerticalBarChartExample'
        exampleCards={
          <div>
            <ExampleCard title='VerticalBarChart' code={ VerticalBarChartBasicExampleCode }>
              <VerticalBarChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              // TODO this causes npm start error Module not found: Error: Can't resolve
              require<string>('!raw-loader!@uifabric/charting/src/components/VerticalBarChart/VerticalBarChart.types.ts'),
            ] }
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>
              VerticalBarChart description
            </p>
          </div>
        }
        /* tslint:enable:max-line-length */
        bestPractices={
          <div />
        }
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
        related={
          <a href='https://dev.office.com/fabric-js/Components/VerticalBarChart/VerticalBarChart.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}
