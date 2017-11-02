import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { CalloutContainerBasicExample } from './examples/CalloutContainer.Basic.Example';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/CalloutContainer/examples/CalloutContainer.Basic.Example.tsx') as string;

export class CalloutContainerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Callout Container'
        componentName='CalloutContainer'
        exampleCards={
          <div>
            <ExampleCard title='Callout Container Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <CalloutContainerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/CalloutContainer/CalloutContainer.Props.ts')
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