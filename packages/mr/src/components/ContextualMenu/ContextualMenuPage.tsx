import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';

const ContextualMenuBasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/ContextualMenu/examples/ContextualMenu.Basic.Example.tsx') as string;

export class ContextualMenuPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="ContextualMenu"
        componentName="ContextualMenuExample"
        exampleCards={
          <div>
            <ExampleCard title="ContextualMenu Basic" code={ContextualMenuBasicExampleCode}>
              <ContextualMenuBasicExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/mr/src/components/ContextualMenu/ContextualMenu.types.ts')]}
          />
        }
        overview={
          <div>
            <p>ContextualMenu description</p>
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
