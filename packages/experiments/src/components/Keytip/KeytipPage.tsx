import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage } from '@uifabric/example-app-base';
import { KeytipBasicExample } from './examples/Keytip.Basic.Example';
import { KeytipDisabledExample } from './examples/Keytip.Disabled.Example';
import { KeytipLanguageExample } from './examples/Keytip.Language.Example';
import { KeytipLayer } from '../../KeytipLayer';

export class KeytipPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <ComponentPage
          title="Keytip"
          componentName="Keytip"
          exampleCards={
            <div>
              <ExampleCard title="Basic Keytip">
                <KeytipBasicExample />
              </ExampleCard>
              <ExampleCard title="Disabled Keytip">
                <KeytipDisabledExample />
              </ExampleCard>
              <ExampleCard title="Keytip Languages">
                <KeytipLanguageExample />
              </ExampleCard>
            </div>
          }
          overview={
            <div>
              <p>
                A Keytip is a small popup near a component that indicates a key sequence that will trigger that component. These are not to
                be confused with keyboard shortcuts; they are instead key sequences to traverse through UI components. Technically, a Keytip
                is a wrapper around a Callout where the target element is discovered through a 'data-ktp-id' attribute on that element.
              </p>

              <p>
                The key sequence for a Keytip must be any combination of alphanumeric characters (A-Z, 0-9). No modifiers (Alt, Shift, Ctrl)
                can be used for these sequences.
              </p>
            </div>
          }
          bestPractices={<div />}
          dos={
            <div>
              <ul>
                <li>The content in the Keytip should only be the alphanumeric letters that will trigger this Keytip</li>
              </ul>
            </div>
          }
          donts={
            <div>
              <ul>
                <li>
                  Don't add Keytips directly into your app. They should be added with the registerKeytip helper through another component
                </li>
              </ul>
            </div>
          }
          isHeaderVisible={this.props.isHeaderVisible}
        />
        <KeytipLayer id={'test-id'} />
      </div>
    );
  }
}
