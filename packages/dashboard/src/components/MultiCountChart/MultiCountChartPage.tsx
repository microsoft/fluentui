import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps } from '@uifabric/example-app-base';
const MultiCountChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/MultiCountChart/examples/MultiCountChart.Example.tsx') as string;

import { MultiCountChartExample } from './examples/MultiCountChart.Example';

export class MultiCountChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    const style = {
      width: '300px'
    };
    return (
      <ComponentPage
        title="Multicount chart"
        componentName="MulticountChartExample"
        exampleCards={
          <div>
            <ExampleCard title="MulticountChart" code={MultiCountChartExampleCode}>
              <div style={style}>
                <MultiCountChartExample />
              </div>
            </ExampleCard>
          </div>
        }
        overview={
          <div>
            This datviz has bodyText to show the data along with it's description. It also has a annotation text which
            comes with a icon indicating whether the change is positive,negative or nuetral.
          </div>
        }
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
      />
    );
  }
}
