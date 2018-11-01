import * as React from 'react';
import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { SceneBasicExample } from './examples/Scene.Basic.Example';

const SceneBasicExampleCode = require('!raw-loader!@uifabric/mr/src/components/Scene/examples/Scene.Basic.Example.tsx') as string;

export class ScenePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Scene"
        componentName="SceneExample"
        exampleCards={
          <div>
            <ExampleCard title="Scene Basic" code={SceneBasicExampleCode}>
              <SceneBasicExample />
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/mr/src/components/Scene/Scene.types.ts')]} />
        }
        overview={
          <div>
            <p>Scene description</p>
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
