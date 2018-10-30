import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps } from '@uifabric/example-app-base';
import { PanelBasicExample } from './examples/Panel.Basic.Example';

const PanelBasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/Panel/examples/Panel.Basic.Example.tsx') as string;

export class PanelPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Panel"
        componentName="PanelExample"
        exampleCards={
          <div>
            <ExampleCard title="Panel basic" code={PanelBasicExampleCode}>
              <PanelBasicExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        // propertiesTables={
        //   <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/charting/src/components/LineChart/LineChart.types.ts')]} />
        // }
        overview={
          <div>
            <p>Panel description</p>
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
