import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { CoachmarkBasicExample } from './examples/Coachmark.Basic.Example';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/Coachmark/examples/Coachmark.Basic.Example.tsx') as string;

export class CoachmarkPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Coachmark'
        componentName='Coachmark'
        exampleCards={
          <div>
            <ExampleCard title='Coachmark Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <CoachmarkBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/coachmark/Coachmark.Props.ts')
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