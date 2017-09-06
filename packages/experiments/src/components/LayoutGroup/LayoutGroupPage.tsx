import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { LayoutGroupBasicExample } from './examples/LayoutGroup.Basic.Example';
const LayoutGroupBasicExampleCode =
  require('!raw-loader!experiments/src/components/LayoutGroup/examples/LayoutGroup.Basic.Example.tsx') as string;

export class LayoutGroupPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='LayoutGroup'
        componentName='LayoutGroup'
        exampleCards={
          <div>
            <ExampleCard title='Folder Cover' isOptIn={ true } code={ LayoutGroupBasicExampleCode }>
              <LayoutGroupBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/LayoutGroup/LayoutGroup.props.ts')
            ] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent a folder which may contain visual content.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>To represent the concept of a folder as opposed to an actual folder item.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
