import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { SignalFieldBasicExample } from './SignalField.Basic.Example';
const SignalFieldBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Signals/SignalField.Basic.Example.tsx') as string;

import { SignalsBasicExample } from './Signals.Basic.Example';
const SignalsBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Signals/Signals.Basic.Example.tsx') as string;

export class SignalsPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Signals"
        componentName="SignalField"
        exampleCards={
          <div>
            <ExampleCard title="Controlling Signal alignment" isOptIn={true} code={SignalFieldBasicExampleCode}>
              <SignalFieldBasicExample />
            </ExampleCard>
            <ExampleCard title="All Signal types" isOptIn={true} code={SignalsBasicExampleCode}>
              <SignalsBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/signals/Signals.Props.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>
              A <code>Signal</code> is a combination of an <code>Icon</code> with a color and optional metadata which
              carries a standardized, semantic meaning.
            </p>
            <p>
              A <code>SignalField</code> is a layout component which nicely arranges <code>Signal</code> and text
              elements for presentation.
            </p>
          </div>
        }
        dos={
          <div>
            <ul>
              <li>Use them to associate a document with a specific state.</li>
              <li>
                Assign localized <code>aria-label</code> attributes to the <code>Signal</code> elements which align with
                their meaning.
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them just for their icon, or re-assign their colors.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
