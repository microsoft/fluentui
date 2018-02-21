import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';
import { KeytipLayerBasicExample } from './examples/KeytipLayer.Basic.Example';

export class KeytipLayerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Keytip Layer'
        componentName='KeytipLayer'
        exampleCards={
          <div>
            <ExampleCard title='KeytipLayer Basic'>
              <KeytipLayerBasicExample />
            </ExampleCard>
          </div>
        }
        overview={
          <div>
            <p>A KeytipLayer is the component to add to your app to enable Keytips. It can be added anywhere in your document, but must
              only be added once. Use the registerKeytip utility helper to add a Keytip to your app through the component render() function
              it belongs to.</p>
            <p>Key sequences can be defined to enter and exit Keytip mode. These sequences can be any keys along with modifiers (Alt, Shift
              Ctrl, etc). The enter and exit sequences default to Alt-Win. There is also a sequence to 'return' up a level of keytips, this
              defaults to 'Esc'.</p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Keytip sequences can be duplicated as long as none of their siblings have the same sequence</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't create more than 1 KeytipLayer per app. This will cause issues with the key listeners</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}