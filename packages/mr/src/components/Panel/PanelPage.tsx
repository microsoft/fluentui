import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { PanelBasicExample } from './examples/Panel.Basic.Example';
import { PanelDarkExample } from './examples/Panel.Dark.Example';

const PanelBasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/Panel/examples/Panel.Basic.Example.tsx') as string;
const PanelDarkExampleCode = require('!raw-loader!@uifabric/mr/src/components/Panel/examples/Panel.Dark.Example.tsx') as string;

export class PanelPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Panel"
        componentName="PanelExample"
        exampleCards={
          <div>
            <ExampleCard title="Panel Light" code={PanelBasicExampleCode}>
              <PanelBasicExample />
            </ExampleCard>
            <ExampleCard title="Panel Dark" code={PanelDarkExampleCode}>
              <PanelDarkExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/mr/src/components/Panel/Panel.types.ts')]} />
        }
        overview={
          <div>
            <p>Panel description</p>
          </div>
        }
        /* tslint:enable:max-line-length */
        // bestPractices={<div />}
        // dos={
        //   <div>
        //     <ul>
        //       <li />
        //     </ul>
        //   </div>
        // }
        // donts={
        //   <div>
        //     <ul>
        //       <li />
        //     </ul>
        //   </div>
        // }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
