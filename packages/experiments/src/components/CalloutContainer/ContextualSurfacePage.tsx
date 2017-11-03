import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { ContextualSurfaceBasicExample } from './examples/ContextualSurface.Basic.Example';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/ContextualSurface/examples/ContextualSurface.Basic.Example.tsx') as string;

export class ContextualSurfacePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Callout Container'
        componentName='ContextualSurface'
        exampleCards={
          <div>
            <ExampleCard title='Callout Container Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <ContextualSurfaceBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/ContextualSurface/ContextualSurface.Props.ts')
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
              <li>@TODO Add dos</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>@TODO Add dos</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}